import React, { useState, useEffect } from 'react';
import './ItemForm.css';

const ItemForm = ({ onAddItem, showEditButtons, toggleEditMode, bannerUrl, updateBannerUrl }) => {
  const [item, setItem] = useState({
    url: '',
    category: '',
    title: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [newBannerUrl, setNewBannerUrl] = useState(bannerUrl);
  const [config, setConfig] = useState({
    pageTitle: 'start:ichi',
    favicon: '%PUBLIC_URL%/favicon.ico'
  });

  // Update new banner URL state when prop changes
  useEffect(() => {
    setNewBannerUrl(bannerUrl);
  }, [bannerUrl]);

  // Fetch configuration on component mount
  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/config');
      const data = await response.json();
      setConfig(data);
    } catch (err) {
      console.error('Error fetching config:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleBannerUrlChange = (e) => {
    setNewBannerUrl(e.target.value);
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  // Validate URL function
  const validateUrl = (url) => {
    // Regular URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    
    // Check for port-only format (e.g., :8080)
    const portPattern = /^:\d+$/;
    
    // Check for IP address with port (e.g., 192.168.1.11:1234)
    const ipWithPortPattern = /^(\d{1,3}\.){3}\d{1,3}:\d+$/;
    
    // Check for http:// or https:// followed by IP address with port
    const httpIpWithPortPattern = /^https?:\/\/(\d{1,3}\.){3}\d{1,3}:\d+(\/.*)?$/;
    
    return urlPattern.test(url) || portPattern.test(url) || ipWithPortPattern.test(url) || httpIpWithPortPattern.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = item.url.trim();
    
    if (!url) {
      alert('URL is required!');
      return;
    }
    
    // Check if it's a valid URL or port-only format
    if (!validateUrl(url)) {
      alert('Please enter a valid URL or port number (e.g., :8080)');
      return;
    }
    
    onAddItem(item);
    
    // Reset form
    setItem({
      url: '',
      category: '',
      title: ''
    });
  };

  const handleConfigSubmit = (e) => {
    e.preventDefault();
    
    // Update banner URL
    if (newBannerUrl.trim()) {
      updateBannerUrl(newBannerUrl);
    }

    // Update config
    updateConfig(config);
    
    setIsConfigOpen(false);
  };

  const updateConfig = async (configData) => {
    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configData),
      });
      
      // Update page title directly
      document.title = configData.pageTitle;
    } catch (err) {
      console.error('Error updating config:', err);
    }
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const toggleConfigPanel = () => {
    setIsConfigOpen(!isConfigOpen);
    if (!isConfigOpen) {
      fetchConfig();
      setNewBannerUrl(bannerUrl);
    }
  };

  return (
    <div className="terminal-form-container">
      <div className="terminal-buttons-row">
        <button 
          className="terminal-toggle-btn"
          onClick={toggleForm}
        >
          {isOpen ? '[close]' : '[add new link]'}
        </button>
        
        <button 
          className="terminal-toggle-btn terminal-toggle-edit-btn"
          onClick={toggleEditMode}
        >
          {showEditButtons ? '[exit edit]' : '[edit links]'}
        </button>

        <button 
          className="terminal-toggle-btn terminal-toggle-banner-btn"
          onClick={toggleConfigPanel}
        >
          {isConfigOpen ? '[close config]' : '[configuration]'}
        </button>
      </div>
      
      {isConfigOpen && (
        <div className="terminal-form">
          <form onSubmit={handleConfigSubmit}>
            <div className="terminal-input-group">
              <label htmlFor="pageTitle">{'>'}  page title: </label>
              <input
                type="text"
                id="pageTitle"
                name="pageTitle"
                value={config.pageTitle}
                onChange={handleConfigChange}
                placeholder="Page Title"
                required
              />
            </div>
            
            <div className="terminal-input-group">
              <label htmlFor="bannerUrl">{'>'}  banner url: </label>
              <input
                type="url"
                id="bannerUrl"
                name="bannerUrl"
                value={newBannerUrl}
                onChange={handleBannerUrlChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="terminal-submit-btn"
            >
              [update config]
            </button>
          </form>
        </div>
      )}
      
      {isOpen && (
        <div className="terminal-form">
          <form onSubmit={handleSubmit}>
            <div className="terminal-input-group">
              <label htmlFor="title">{'>'}  title: </label>
              <input
                type="text"
                id="title"
                name="title"
                value={item.title}
                onChange={handleChange}
                placeholder="Enter a title for the link"
                required
              />
            </div>

            <div className="terminal-input-group">
              <label htmlFor="url">{'>'}  url: </label>
              <input
                type="text"
                id="url"
                name="url"
                value={item.url}
                onChange={handleChange}
                placeholder="https://example.com or :8080"
                required
              />
            </div>
            
            <div className="terminal-input-group">
              <label htmlFor="category">{'>'}  category: </label>
              <input
                type="text"
                id="category"
                name="category"
                value={item.category}
                onChange={handleChange}
                placeholder="Category (optional)"
              />
            </div>
            
            <button 
              type="submit" 
              className="terminal-submit-btn"
            >
              [add]
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ItemForm; 