import React, { useState } from 'react';
import { assets } from '../assets/assets';
import '../styles/Navbar.css';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="nav-left">
          {/* Hamburger menu for mobile */}
          <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <img className="logo" src={assets.logo} alt="Ecotown Logo" />
          <div className="logo-text">
            <span className="logo-name">Ecotown Labs</span>
            <span className="logo-tagline">Biomarker Dashboard</span>
          </div>
        </div>

        <div className="navbar-right">
          <button>Sign In</button>
        </div>
      </div>

      {/* Sidebar for mobile (overlays screen) */}
      {sidebarOpen && (
        <div className="mobile-sidebar" onClick={() => setSidebarOpen(false)}>
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;
