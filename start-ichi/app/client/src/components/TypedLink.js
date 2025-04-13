import React, { useState, useEffect } from 'react';
import './TypedLink.css';

// TypedLink component for rendering URLs with typing animation effect
const TypedLink = ({ url, displayText, typingSpeed = 50, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [fontWeight, setFontWeight] = useState(300); // Start with light weight (300)
  const [isHovering, setIsHovering] = useState(false);
  const [hasCompletedInitialTyping, setHasCompletedInitialTyping] = useState(false);
  
  // Process special port URLs
  const processUrl = (inputUrl) => {
    // Check if URL starts with a colon (indicating a port)
    if (inputUrl && inputUrl.startsWith(':')) {
      // Get the current domain
      const currentDomain = window.location.hostname;
      return `${currentDomain}${inputUrl}`;
    }
    return inputUrl;
  };
  
  // Get the actual URL to navigate to
  const getNavigationUrl = () => {
    // If it's a port-only URL, add http protocol
    if (url && url.startsWith(':')) {
      const currentDomain = window.location.hostname;
      return `http://${currentDomain}${url}`;
    }
    return url;
  };
  
  // Get the URL to display
  const getDisplayUrl = () => {
    if (url && url.startsWith(':')) {
      const currentDomain = window.location.hostname;
      return `${currentDomain}${url}`;
    }
    return url;
  };
  
  const textToDisplay = isHovering ? getDisplayUrl() : (displayText || getDisplayUrl());

  // Main typing animation effect - only runs once on initial render
  useEffect(() => {
    let timer;
    let charIndex = 0;
    
    // Gradually increase font weight during typing using lighter weights
    const updateFontWeight = () => {
      if (charIndex < textToDisplay.length) {
        // Calculate font weight based on progress using only lighter weights
        const progress = charIndex / textToDisplay.length;
        let newWeight;
        
        if (progress < 0.25) newWeight = 300;
        else if (progress < 0.5) newWeight = 300;
        else if (progress < 0.75) newWeight = 400;
        else if (progress < 0.9) newWeight = 400;
        else newWeight = 500;
        
        setFontWeight(newWeight);
      }
    };
    
    // Only start the typing animation if we haven't completed initial typing
    if (!hasCompletedInitialTyping && !isHovering) {
      // Delay the start of typing animation
      const startTyping = setTimeout(() => {
        // Reset displayed text at start of animation
        setDisplayedText('');
        setIsTyping(true);
        
        timer = setInterval(() => {
          if (charIndex < textToDisplay.length) {
            setDisplayedText(prevText => prevText + textToDisplay.charAt(charIndex));
            charIndex++;
            updateFontWeight();
          } else {
            clearInterval(timer);
            setIsTyping(false);
            setHasCompletedInitialTyping(true);
            
            // Add a small delay before showing the typing complete animation
            setTimeout(() => {
              setTypingComplete(true);
            }, 300);
          }
        }, typingSpeed);
      }, delay);
      
      return () => {
        clearTimeout(startTyping);
        clearInterval(timer);
      };
    }
  }, [textToDisplay, typingSpeed, delay, isHovering, hasCompletedInitialTyping]);

  // Handle hover state changes
  useEffect(() => {
    if (isHovering) {
      // When hovering, immediately show full URL
      setIsTyping(false);
      setDisplayedText(getDisplayUrl());
    } else if (hasCompletedInitialTyping) {
      // If we already completed the initial typing, just show the full text
      setIsTyping(false);
      setDisplayedText(displayText || getDisplayUrl());
    }
    // We don't need an else case because the initial typing animation
    // is handled by the other useEffect
  }, [isHovering, url, displayText, hasCompletedInitialTyping]);

  return (
    <a 
      href={getNavigationUrl()} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`terminal-link ${isTyping ? 'typing' : ''} ${typingComplete ? 'terminal-typing-complete' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{fontWeight}}
    >
      {displayedText}
      {isTyping && <span className="terminal-cursor">_</span>}
    </a>
  );
};

export default TypedLink; 