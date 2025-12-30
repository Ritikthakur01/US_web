import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let scrollTimeout;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = currentScrollY - lastScrollY;

          setIsScrolled(currentScrollY > 10);

          // Show header when scrolling up or at the top
          if (currentScrollY < 10 || scrollDifference < 0) {
            setIsVisible(true);
          } 
          // Hide header when scrolling down (but not at the top)
          else if (scrollDifference > 0 && currentScrollY > 100) {
            setIsVisible(false);
          }

          setLastScrollY(currentScrollY);

          // Clear existing timeout
          clearTimeout(scrollTimeout);
          
          // Show header when scrolling stops
          scrollTimeout = setTimeout(() => {
            setIsVisible(true);
          }, 150);

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''} ${!isVisible ? 'hidden' : ''}`}
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -115,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="container header-container">
        <Link 
          to="/" 
          className="logo"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              // If navigating from another page, scroll to top after navigation
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }
          }}
        >
          <motion.img
            src="/WhatsApp_Image_2025-12-08_at_4.17.05_AM-removebg-preview.png"
            alt="Unique Solution Logo"
            className="logo-image"
          />
          <div className="logo-text">
            <span className="logo-text-unique">UNIQUE</span>
            <span className="logo-text-solution">SOLUTION</span>
            <span className="logo-text-group">GROUP</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <Link 
            to="/" 
            className="nav-link"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }
            }}
          >
            Home
          </Link>
          <a
            href="/#about"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
          >
            About
          </a>
          <a
            href="/#services"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('services');
            }}
          >
            Services
          </a>
          <a
            href="/#groups"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('groups');
            }}
          >
            Groups
          </a>
          <a
            href="/#get-in-touch"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('get-in-touch');
            }}
          >
            Get In Touch
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </motion.header>

    {/* Mobile Navigation Menu */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          />
          <motion.nav
            className="mobile-nav"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="mobile-nav-header">
              <div className="mobile-nav-logo-section">
                <img
                  src="/WhatsApp_Image_2025-12-08_at_4.17.05_AM-removebg-preview.png"
                  alt="Unique Solution Logo"
                  className="mobile-nav-logo"
                />
                <h3>Menu</h3>
              </div>
              <button 
                className="mobile-nav-close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>
            <Link 
              to="/" 
              className="mobile-nav-link"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }
                closeMobileMenu();
              }}
            >
              Home
            </Link>
            <a
              href="/#about"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                scrollToSection('about');
              }}
            >
              About
            </a>
            <a
              href="/#services"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                scrollToSection('services');
              }}
            >
              Services
            </a>
            <a
              href="/#groups"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                scrollToSection('groups');
              }}
            >
              Groups
            </a>
            <a
              href="/#get-in-touch"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                scrollToSection('get-in-touch');
              }}
            >
              Get In Touch
            </a>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default Header;

