import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToSection = (sectionId) => {
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
  };

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-pattern"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-about">
            <Link 
              to="/" 
              className="footer-logo"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }
              }}
            >
              <img
                src="/WhatsApp_Image_2025-12-08_at_4.17.05_AM-removebg-preview.png"
                alt="Unique Solution Logo"
                className="footer-logo-image"
              />
              <h3>Unique Solution Group</h3>
            </Link>
            <p className="footer-description">
              A comprehensive organization built on four strong pillars, each dedicated to serving different aspects of business and society.
            </p>
            <p className="footer-tagline">
              Excellence • Innovation • Integrity • Service
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <FaArrowRight /> Home
                </Link>
              </li>
              <li>
                <a
                  href="/#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('about');
                  }}
                >
                  <FaArrowRight /> About Us
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                >
                  <FaArrowRight /> Services
                </a>
              </li>
              <li>
                <a
                  href="/#groups"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('groups');
                  }}
                >
                  <FaArrowRight /> Our Entities
                </a>
              </li>
              <li>
                <a
                  href="/#testimonials"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('testimonials');
                  }}
                >
                  <FaArrowRight /> Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/#get-in-touch"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('get-in-touch');
                  }}
                >
                  <FaArrowRight /> Get In Touch
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Our Entities</h4>
            <ul>
              <li>
                <span>Unique Solution Consultants</span>
                <small>Consulting | Compliance | Career Growth</small>
              </li>
              <li>
                <span>Unique Solution Spices</span>
                <small>Taste of Purity</small>
              </li>
              <li>
                <span>Unique Solution Enterprises</span>
                <small>Manufacturing Excellence</small>
              </li>
              <li>
                <span>Unique Solution Foundation</span>
                <small>Serving Humanity</small>
              </li>
            </ul>
          </div>

          <div className="footer-section footer-contact">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li>
                <FaEnvelope className="contact-icon" />
                <div>
                  <strong>Email</strong>
                  <a href="mailto:info@uniquesolution.com">info@uniquesolution.com</a>
                </div>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <div>
                  <strong>Phone</strong>
                  <a href="tel:+916397859259">+91 6397859259</a>
                </div>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <strong>Address</strong>
                  <span>Garhi, Jhinjhak,<br />Kanpur Dehat, Uttar Pradesh - 209302</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Unique Solution Group. All rights reserved.</p>
            <p className="footer-proprietor">Co-Founder & CEO - Hemraj Singh Rajawat</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

