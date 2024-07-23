import React from 'react';
import './Header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        alert('Logout Successfully')
        navigate('/')
      }
  return (
    <div className='main_header'>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
}

export default Header;
