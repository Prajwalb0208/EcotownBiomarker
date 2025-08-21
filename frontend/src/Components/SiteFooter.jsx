import React from "react";
import "../styles/SiteFooter.css";
import { assets } from "../assets/assets";

const SiteFooter = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <img src={assets.logo} alt="" className="footer-logo"/>
        <span className="footer-text">
          &copy; {new Date().getFullYear()} Ecotown Labs. All rights reserved.
        </span>
        <nav className="footer-nav">
          <a href="/about" aria-label="About Ecotown Labs">About</a>
          <a href="/contact" aria-label="Contact Us">Contact</a>
          <a href="/privacy" aria-label="Privacy Policy">Privacy</a>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
