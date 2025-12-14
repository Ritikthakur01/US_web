import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './Banner.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselType, setCarouselType] = useState('auto');

  useEffect(() => {
    fetchBanners();
    fetchCarouselSettings();
  }, []);

  useEffect(() => {
    if (carouselType === 'auto' && banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [carouselType, banners.length]);

  const currentBanner = banners[currentIndex];

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_URL}/banners`);
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const fetchCarouselSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/banners/settings`);
      setCarouselType(response.data.type || 'auto');
    } catch (error) {
      console.error('Error fetching carousel settings:', error);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="banner-section">
      <div className="banner-container">
        <AnimatePresence mode="wait">
          {currentBanner?.link ? (
            <motion.a
              key={currentIndex}
              href={currentBanner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="banner-slide banner-clickable"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
            >
              <div className="banner-media">
                {currentBanner?.image && (
                  <img
                    src={currentBanner.image}
                    alt={currentBanner.title}
                    className="banner-image"
                  />
                )}
                <div className="banner-overlay"></div>
              </div>

              <div className="banner-content">
                
                <h2 className="banner-title">{currentBanner?.title}</h2>
                {currentBanner?.description && (
                  <p className="banner-description">
                    {currentBanner.description}
                  </p>
                )}
              </div>
            </motion.a>
          ) : (
            <motion.div
              key={currentIndex}
              className="banner-slide"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 1.5 }}
            >
              <div className="banner-media">
                {currentBanner?.image && (
                  <img
                    src={currentBanner.image}
                    alt={currentBanner.title}
                    className="banner-image"
                  />
                )}
                <div className="banner-overlay"></div>
              </div>

              <div className="banner-content">
                {/* <div className="banner-meta"> */}
                  {/* <span className="pill">{carouselType === 'auto' ? 'Auto Play' : 'Manual'}</span> */}
                  {/* <span className="pill subtle">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(banners.length).padStart(2, '0')}
                  </span> */}
                {/* </div> */}
                <h2 className="banner-title">{currentBanner?.title}</h2>
                {currentBanner?.description && (
                  <p className="banner-description">
                    {currentBanner.description}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {banners.length > 1 && (
          <>
            {carouselType === 'click' && (
              <>
                <button className="banner-nav prev" onClick={prevSlide}>
                  ‹
                </button>
                <button className="banner-nav next" onClick={nextSlide}>
                  ›
                </button>
              </>
            )}
            <div className="banner-dots">
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;

