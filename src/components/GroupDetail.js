import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import './GroupDetail.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const GroupDetail = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroup();
  }, [id]);

  const fetchGroup = async () => {
    try {
      const response = await axios.get(`${API_URL}/groups/${id}`);
      setGroup(response.data);
    } catch (error) {
      console.error('Error fetching group:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="group-detail-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="group-detail-error">
        <h2>Group not found</h2>
        <Link to="/">Go back home</Link>
      </div>
    );
  }

  return (
    <motion.div
      className="group-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
        {group.image && (
          <motion.img
            src={group.image}
            alt={group.name}
            className="group-detail-image"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <motion.div
          className="group-detail-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="group-detail-title">{group.name}</h1>
          {group.description && (
            <p className="group-detail-description">{group.description}</p>
          )}
          {group.details?.content && (
            <div
              className="group-detail-body"
              dangerouslySetInnerHTML={{ __html: group.details.content }}
            />
          )}
          {group.details?.features && (
            <div className="group-features">
              <h2>Features</h2>
              <ul>
                {group.details.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GroupDetail;

