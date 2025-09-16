import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logoImage from '../assets/images/307854703_508778997928563_2050649504796643182_n-e1753080453472.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src={logoImage} 
            alt="TEACOUNTRY" 
            className={scrolled ? 'logo-small' : 'logo-large'}
          />
        </Link>

        {/* Mobile menu toggle button */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${menuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`nav-menu-container ${menuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/offers" className="nav-link" onClick={() => setMenuOpen(false)}>Offers</Link>
            </li>
            <li className="nav-item">
              <Link to="/gallery" className="nav-link" onClick={() => setMenuOpen(false)}>Gallery</Link>
            </li>
            <li className="nav-item">
              <Link to="/destinations" className="nav-link" onClick={() => setMenuOpen(false)}>Destinations</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link" onClick={() => setMenuOpen(false)}>Blog</Link>
            </li>
            <li className="nav-item">
              <Link to="/testimonial" className="nav-link" onClick={() => setMenuOpen(false)}>Testimonial</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;