import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './AnnouncementBar.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    fetchAnnouncement();
    // Refresh announcement every 5 minutes
    const interval = setInterval(fetchAnnouncement, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update body class based on announcement visibility
    if (announcement && announcement.isActive) {
      document.body.classList.add('announcement-visible');
    } else {
      document.body.classList.remove('announcement-visible');
    }
    return () => {
      document.body.classList.remove('announcement-visible');
    };
  }, [announcement]);

  const fetchAnnouncement = async () => {
    try {
      const response = await axios.get(`${API_URL}/announcement/active`);
      if (response.data && response.data.isActive) {
        setAnnouncement(response.data);
      } else {
        setAnnouncement(null);
      }
    } catch (error) {
      console.error('Error fetching announcement:', error);
      setAnnouncement(null);
    }
  };

  if (!announcement || !announcement.isActive) {
    return null;
  }

  // Filter out Republic Day icon/emoji from content
  const filteredContent = announcement.content
    .replace(/🇮🇳/g, '')
    .replace(/🏳️/g, '')
    .replace(/flag/gi, '')
    .replace(/republic/gi, '')
    .trim();

  const announcementContent = (
    <div className="announcement-content">
      <span className="announcement-text">{filteredContent}</span>
    </div>
  );

  const animationSpeed = announcement.speed || 30;

  return (
    <AnimatePresence>
      <motion.div
        className="announcement-bar"
        style={{
          backgroundColor: announcement.backgroundColor || 'var(--color-primary)',
          color: announcement.textColor || '#ffffff',
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="announcement-wrapper">
          {announcement.link ? (
            <a
              href={announcement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="announcement-link"
            >
              <div className="announcement-slider" style={{ animationDuration: `${animationSpeed}s` }}>
                <div className="announcement-slide">{announcementContent}</div>
              </div>
            </a>
          ) : (
            <div className="announcement-slider" style={{ animationDuration: `${animationSpeed}s` }}>
              <div className="announcement-slide">{announcementContent}</div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBar;

