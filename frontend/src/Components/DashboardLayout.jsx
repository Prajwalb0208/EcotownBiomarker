import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SiteFooter from './SiteFooter';

const DashboardLayout = ({ children }) => (
  <div className="dashboard-layout">
    <Sidebar />
    <div className="dashboard-main">
      <Navbar />
      <div className="dashboard-content">
        {children}
      </div>
      <SiteFooter />
    </div>
  </div>
);

export default DashboardLayout;
