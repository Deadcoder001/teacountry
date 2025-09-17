import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import logoImage from '../assets/images/307854703_508778997928563_2050649504796643182_n-e1753080453472.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src={logoImage} alt="Tea Country" />
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Explore</h4>
              <Link to="/">Home</Link>
              <Link to="/destinations">Destinations</Link>
              <Link to="/offers">Offers</Link>
              <Link to="/e-book">E-book</Link>
            </div>
            
            <div className="footer-links-column">
              <h4>About</h4>
              <Link to="/testimonial">Testimonials</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div>
            <p>&copy; {currentYear} Tea Country. All rights reserved.</p>
            <p>Made with ❤ by Scabbardtech</p>
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z"></path>
                <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"></path>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.9442 7.92638C19.9569 8.10403 19.9569 8.28173 19.9569 8.45938C19.9569 13.8781 15.8326 20.1218 8.29444 20.1218C5.97209 20.1218 3.81473 19.4492 2 18.2817C2.32996 18.3198 2.64719 18.3325 2.98988 18.3325C4.90607 18.3325 6.67006 17.6853 8.07386 16.5812C6.27186 16.5431 4.76613 15.3629 4.24617 13.7386C4.5 13.7766 4.75378 13.802 5.02025 13.802C5.38833 13.802 5.75646 13.7512 6.09915 13.6624C4.22083 13.2817 2.81702 11.6193 2.81702 9.61675V9.56611C3.36236 9.86802 3.99239 10.0584 4.6605 10.0838C3.56348 9.34492 2.8423 8.0838 2.8423 6.6701C2.8423 5.90584 3.04795 5.20381 3.40335 4.59747C5.41294 7.07004 8.44451 8.70076 11.8477 8.87841C11.7843 8.5765 11.7462 8.26186 11.7462 7.94718C11.7462 5.6954 13.5736 3.87842 15.8452 3.87842C17.0254 3.87842 18.0843 4.37588 18.8233 5.17893C19.7307 4.99998 20.6 4.65737 21.3644 4.18525C21.0624 5.14084 20.4197 5.90584 19.5884 6.38997C20.3909 6.30205 21.1681 6.0736 21.8871 5.75891C21.3644 6.53666 20.7091 7.2387 19.9442 7.92638Z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;