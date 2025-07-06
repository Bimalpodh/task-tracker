// src/Component/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Task Tracker 📋 | Made with ❤️ by Bimal Podh
      </p>
      <div className="footer-links">
        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/bimal-podh-2a00542b0/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="mailto:bimalpodh08@gmail.com">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
