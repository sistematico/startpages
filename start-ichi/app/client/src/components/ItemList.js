import React, { useState } from 'react';
import './ItemList.css';
import TypedLink from './TypedLink';
import './TypedLink.css';

const ItemList = ({ items, onUpdateItem, onDeleteItem, showEditButtons }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedItem, setEditedItem] = useState(null);

  const handleEdit = (item) => {
    setEditMode(item.id);
    setEditedItem({ ...item });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  // Function to validate URL, similar to ItemForm
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

  const handleUpdate = () => {
    // Validate URL before updating
    if (!editedItem.url.trim()) {
      alert('URL is required!');
      return;
    }
    
    if (!validateUrl(editedItem.url)) {
      alert('Please enter a valid URL or port number (e.g., :8080)');
      return;
    }
    
    onUpdateItem(editedItem);
    setEditMode(null);
    setEditedItem(null);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedItem(null);
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    // Map categories to terminal-friendly icons
    const categoryIcons = {
      'Search': '🔍',
      'Shopping': '🛒',
      'News': '📰',
      'Tech': '💻',
      'Entertainment': '🎬',
      'Social': '👥',
      'Uncategorized': '📁',
      // Add fallback for any other categories
      'default': '📌'
    };
    
    return categoryIcons[category] || categoryIcons['default'];
  };

  if (items.length === 0) {
    return (
      <div className="terminal-no-items">
        {'>'}  No links added yet. Add some below.
      </div>
    );
  }

  // Split categories into two columns
  const categories = Object.keys(groupedItems).sort();
  const midpoint = Math.ceil(categories.length / 2);
  const leftColumnCategories = categories.slice(0, midpoint);
  const rightColumnCategories = categories.slice(midpoint);

  const renderCategory = (category) => (
    <div key={category} className="terminal-category">
      <div className="terminal-category-header">
        {'>'}  {getCategoryIcon(category)} {category}
      </div>
      <ul className="terminal-links">
        {groupedItems[category].map((item, index) => (
          <li key={item.id} className="terminal-link-item">
            {editMode === item.id ? (
              <div className="terminal-edit-form">
                <div className="terminal-input-line">
                  {'>'}  title: 
                  <input
                    type="text"
                    name="title"
                    value={editedItem.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="terminal-input-line">
                  {'>'}  url: 
                  <input
                    type="text"
                    name="url"
                    value={editedItem.url}
                    onChange={handleChange}
                    placeholder="URL or :port"
                    required
                  />
                </div>
                <div className="terminal-input-line">
                  {'>'}  category: 
                  <input
                    type="text"
                    name="category"
                    value={editedItem.category}
                    onChange={handleChange}
                    placeholder="Category"
                  />
                </div>
                <div className="terminal-edit-actions">
                  <button 
                    onClick={handleUpdate} 
                    className="terminal-btn terminal-save-btn"
                  >
                    [save]
                  </button>
                  <button 
                    onClick={handleCancelEdit} 
                    className="terminal-btn terminal-cancel-btn"
                  >
                    [cancel]
                  </button>
                </div>
              </div>
            ) : (
              <div className="terminal-link-content">
                <span className="terminal-prompt">{'>'}  </span>
                <TypedLink 
                  url={item.url}
                  displayText={item.title || item.url}
                  typingSpeed={50}
                  delay={index * 300} // Stagger the typing effect
                />
                {showEditButtons && (
                  <div className="terminal-item-actions">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="terminal-btn terminal-edit-btn"
                    >
                      [edit]
                    </button>
                    <button 
                      onClick={() => onDeleteItem(item.id)} 
                      className="terminal-btn terminal-delete-btn"
                    >
                      [del]
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="terminal-item-list">
      <div className="terminal-columns">
        <div className="terminal-column">
          {leftColumnCategories.map(renderCategory)}
        </div>
        <div className="terminal-column">
          {rightColumnCategories.map(renderCategory)}
        </div>
      </div>
    </div>
  );
};

export default ItemList; 