import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaAward, FaLightbulb, FaHeart, FaUsers, FaRocket } from 'react-icons/fa';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const values = [
    {
      icon: <FaShieldAlt />,
      title: 'Integrity First',
      description: 'We conduct business with the highest ethical standards, ensuring transparency and trust in every interaction.',
    },
    {
      icon: <FaAward />,
      title: 'Quality Excellence',
      description: 'Committed to delivering superior quality in all our products and services, exceeding customer expectations.',
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description: 'Continuously evolving and adopting innovative solutions to meet the changing needs of our clients and communities.',
    },
    {
      icon: <FaHeart />,
      title: 'Social Responsibility',
      description: 'Dedicated to making a positive impact on society through our foundation and community initiatives.',
    },
    {
      icon: <FaUsers />,
      title: 'Customer-Centric',
      description: 'Your success is our priority. We provide personalized solutions tailored to your unique requirements.',
    },
    {
      icon: <FaRocket />,
      title: 'Growth-Oriented',
      description: 'Empowering individuals and businesses to achieve their goals through our comprehensive range of services.',
    },
  ];

  return (
    <section id="why-choose-us" className="why-choose-us-section">
      <div className="container">
        <motion.div
          className="why-choose-us-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Our core values and commitment to excellence set us apart
          </p>
        </motion.div>

        <div className="values-grid">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="value-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className="value-icon-wrapper">
                <div className="value-icon">{value.icon}</div>
              </div>
              <div className="value-content">
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

