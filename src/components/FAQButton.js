import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './FAQButton.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const FAQButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${API_URL}/faqs`);
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Sticky FAQ Button */}
      <motion.button
        className="faq-button"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <FaQuestionCircle className="faq-button-icon" />
        <span className="faq-button-text">FAQ</span>
      </motion.button>

      {/* FAQ Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="faq-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="faq-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="faq-modal-header">
                <div>
                  <h2 className="faq-modal-title">Frequently Asked Questions</h2>
                  <p className="faq-modal-subtitle">
                    Find answers to common questions about our services
                  </p>
                </div>
                <button
                  className="faq-modal-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close FAQ"
                >
                  <FaTimes />
                </button>
              </div>

              {/* FAQ List */}
              <div className="faq-modal-content">
                {loading ? (
                  <div className="loading-faqs">Loading FAQs...</div>
                ) : faqs.length === 0 ? (
                  <div className="no-faqs">No FAQs available at the moment.</div>
                ) : (
                  faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className={`faq-modal-item ${openIndex === index ? 'open' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      className="faq-modal-question"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span>{faq.question}</span>
                      <motion.span
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          className="faq-modal-answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p>{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FAQButton;

