import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUsers, FaArrowRight, FaIndustry, FaBuilding, FaHeart } from 'react-icons/fa';
import './Groups.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    'consultants': FaUsers,
    'spices': FaIndustry,
    'enterprises': FaBuilding,
    'foundation': FaHeart,
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${API_URL}/groups`);
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSubdomainUrl = (subdomain) => {
    if (!subdomain) return null;
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    // For production, this would be: https://consultants.uniquesolution.com
    // For development, we'll use localhost with port
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${subdomain}.${hostname}:${window.location.port || 3000}`;
    }
    return `${protocol}//${subdomain}.${hostname}`;
  };

  if (loading) {
    return (
      <section className="groups-section">
        <div className="container">
          <div className="loading">Loading groups...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="groups" className="groups-section">
      <div className="container groups-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Entities
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          UNIQUE SOLUTION GROUP comprises of 4 Pillars/Entities
        </motion.p>
        <div className="groups-grid">
          {groups.map((group, index) => {
            const IconComponent = iconMap[group._id] || FaUsers;
            const subdomainUrl = getSubdomainUrl(group.subdomain);
            
            return (
              <motion.div
                key={group._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {subdomainUrl ? (
                  <a 
                    href={subdomainUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group-card"
                  >
                    <div className="group-icon">
                      <IconComponent />
                    </div>
                    {group.image && (
                      <img
                        src={group.image}
                        alt={group.name}
                        className="group-image"
                      />
                    )}
                    <div className="group-content">
                      <h3 className="group-name">{group.name}</h3>
                      {group.description && (
                        <p className="group-description">{group.description}</p>
                      )}
                      <span className="group-link">
                        Visit Website <FaArrowRight />
                      </span>
                    </div>
                  </a>
                ) : (
                  <Link to={`/group/${group._id}`} className="group-card">
                    <div className="group-icon">
                      <IconComponent />
                    </div>
                    {group.image && (
                      <img
                        src={group.image}
                        alt={group.name}
                        className="group-image"
                      />
                    )}
                    <div className="group-content">
                      <h3 className="group-name">{group.name}</h3>
                      {group.description && (
                        <p className="group-description">{group.description}</p>
                      )}
                      <span className="group-link">
                        Learn More <FaArrowRight />
                      </span>
                    </div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Groups;

