import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaPepperHot, FaIndustry, FaHandsHelping, FaCheckCircle } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const services = [
    {
      entity: 'Unique Solution Consultants',
      icon: <FaBriefcase />,
      services: [
        'Job Placement Services',
        'Career Counseling',
        'Resume Building',
        'Interview Preparation',
        'Compliance & Legal Services',
        'HR Consulting',
      ],
    },
    {
      entity: 'Unique Solution Spices',
      icon: <FaPepperHot />,
      services: [
        'Premium Quality Spices',
        'Organic & Natural Products',
        'Direct from Farmers',
        'Bulk Supply',
        'Custom Packaging',
        'Quality Certified Products',
      ],
    },
    {
      entity: 'Unique Solution Enterprises',
      icon: <FaIndustry />,
      services: [
        'Manufacturing Services',
        'Product Development',
        'Quality Assurance',
        'Supply Chain Management',
        'Custom Solutions',
        'Industrial Consulting',
      ],
    },
    {
      entity: 'Unique Solution Foundation',
      icon: <FaHandsHelping />,
      services: [
        'Education Support',
        'Healthcare Initiatives',
        'Community Development',
        'Skill Training Programs',
        'Social Welfare Activities',
        'Empowerment Programs',
      ],
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What We Do</h2>
          <p className="section-subtitle">
            Comprehensive services across all our entities to serve your diverse needs
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-entity">{service.entity}</h3>
              <ul className="service-list">
                {service.services.map((item, itemIndex) => (
                  <li key={itemIndex} className="service-item">
                    <FaCheckCircle className="check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

