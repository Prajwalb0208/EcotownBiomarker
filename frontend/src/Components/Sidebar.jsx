import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Analytics</h2>
      <ul className="sidebar-menu" onClick={closeSidebar}>
        <li><NavLink to="/" end>Overview</NavLink></li>
        <li><NavLink to="/patients">Patients</NavLink></li>
        <li><NavLink to="/reports">Reports</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
