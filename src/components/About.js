import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaUsers, FaIndustry, FaHeart } from 'react-icons/fa';
import './About.css';

const About = () => {
  const entities = [
    {
      logo: '/US_consultant_logo.jpeg',
      icon: <FaUsers />,
      name: 'Unique Solution Consultants',
      tagline: 'Consulting | Compliance | Career Growth',
      description: 'A team of dedicated professionals passionate about connecting talented individuals with their dream jobs across India. We provide personalized recruitment solutions that cater to the diverse needs of our clients and job seekers.',
    },
    {
      logo: '/US_spices_logo.jpeg',
      icon: <FaIndustry />,
      name: 'Unique Solution Spices',
      tagline: 'Taste of Purity',
      description: 'Passionate about bringing authentic flavors and aromas of traditional Indian spices to households across India. We provide high-quality, organic spices sourced directly from local farmers and producers.',
    },
    {
      icon: <FaBuilding />,
      name: 'Unique Solution Enterprises',
      tagline: 'Manufacturing Excellence',
      description: 'A dynamic and innovative company dedicated to providing top-quality products and services across India. We have established ourselves as a trusted name in the industry with a strong commitment to excellence.',
    },
    {
      icon: <FaHeart />,
      name: 'Unique Solution Foundation',
      tagline: 'Serving Humanity',
      description: 'Dedicated to creating a more compassionate and thriving society by ensuring access to basic necessities for every underprivileged individual. We provide support to the needy, promote education, and empower marginalized communities.',
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-header">
            <h1 className="about-title">
              ABOUT - <span className="title-unique">UNIQUE</span> <span className="title-solution">SOLUTION</span> <span className="title-group">GROUP</span>
            </h1>
            <div className="title-underline"></div>
            <p className="about-subtitle">
              <span className="subtitle-unique">UNIQUE</span> <span className="subtitle-solution">SOLUTION</span> <span className="subtitle-group">GROUP</span> comprises of 4 Pillars/Entities
            </p>
          </div>

          <div className="about-main">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2>Our Structure</h2>
              <p>
                UNIQUE SOLUTION GROUP is a comprehensive organization built on four strong pillars,
                each dedicated to serving different aspects of business and society. Together, these
                entities form a cohesive group committed to excellence, innovation, and social responsibility.
              </p>
              <p>
                Each entity operates independently while sharing the core values of integrity, quality,
                and customer satisfaction that define UNIQUE SOLUTION GROUP.
              </p>
            </motion.div>

            <motion.div
              className="about-image-placeholder"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="image-gradient">
                <FaBuilding className="placeholder-icon" />
              </div>
            </motion.div>
          </div>

          <div className="features-grid">
            {entities.map((entity, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {entity.logo ? (
                  <img
                    src={entity.logo}
                    alt={entity.name}
                    className="feature-logo"
                  />
                ) : (
                  <div className="feature-icon">{entity.icon}</div>
                )}
                <h3>{entity.name}</h3>
                <p className="entity-tagline">{entity.tagline}</p>
                <p className="entity-description">{entity.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

