import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaInfoCircle, FaPhone, FaUser } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <FaBars className="hamburger-icon" onClick={toggleSidebar} />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/">
            <FaHome className="menu-icon" />
            <span className="menu-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <FaInfoCircle className="menu-icon" />
            <span className="menu-text">About</span>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <FaPhone className="menu-icon" />
            <span className="menu-text">Contact</span>
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;