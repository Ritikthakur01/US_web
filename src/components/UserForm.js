import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaPaperPlane } from 'react-icons/fa';
import './UserForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const UserForm = () => {
  const [groups, setGroups] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchGroups();
    fetchFormFields();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${API_URL}/groups`);
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const fetchFormFields = async () => {
    try {
      const response = await axios.get(`${API_URL}/form-fields`);
      setFormFields(response.data);
      // Initialize form data with field names
      const initialData = {};
      response.data.forEach((field) => {
        initialData[field.name] = '';
      });
      // Always include group fields
      initialData.groupId = '';
      initialData.groupName = '';
      setFormData(initialData);
    } catch (error) {
      console.error('Error fetching form fields:', error);
      // Fallback to empty form data if API fails
      setFormData({
        groupId: '',
        groupName: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'groupId') {
      const selectedGroup = groups.find((g) => g._id === value);
      setFormData({
        ...formData,
        groupId: value,
        groupName: selectedGroup ? selectedGroup.name : '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const renderFormField = (field) => {
    const fieldValue = formData[field.name] || '';
    const fieldId = `field-${field.name}`;

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field._id} className="form-group">
            <label htmlFor={fieldId}>
              {field.label} {field.required && '*'}
            </label>
            <textarea
              id={fieldId}
              name={field.name}
              value={fieldValue}
              onChange={handleChange}
              placeholder={field.placeholder || ''}
              required={field.required}
              rows={4}
              className="form-textarea"
              minLength={field.validation?.minLength}
              maxLength={field.validation?.maxLength}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field._id} className="form-group">
            <label htmlFor={fieldId}>
              {field.label} {field.required && '*'}
            </label>
            <select
              id={fieldId}
              name={field.name}
              value={fieldValue}
              onChange={handleChange}
              required={field.required}
              className="form-select"
            >
              <option value="">{field.placeholder || 'Select an option'}</option>
              {field.options && field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      default:
        return (
          <div key={field._id} className="form-group">
            <label htmlFor={fieldId}>
              {field.label} {field.required && '*'}
            </label>
            <input
              type={field.type}
              id={fieldId}
              name={field.name}
              value={fieldValue}
              onChange={handleChange}
              placeholder={field.placeholder || ''}
              required={field.required}
              minLength={field.validation?.minLength}
              maxLength={field.validation?.maxLength}
              pattern={field.validation?.pattern}
            />
          </div>
        );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Build submit data from form fields
      const submitData = {
        ...formData,
      };
      const response = await axios.post(`${API_URL}/users`, submitData);
      
      // Show success toast
      toast.success('Thank you! We\'ll be in touch soon.', {
        position: "top-right",
        autoClose: 5000,
      });
      
      // Reset form
      const resetData = {};
      formFields.forEach((field) => {
        resetData[field.name] = '';
      });
      resetData.groupId = '';
      resetData.groupName = '';
      setFormData(resetData);
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit. Please try again.';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Don't show form section if no fields are added
  if (formFields.length === 0) {
    return null;
  }

  return (
    <section id="get-in-touch" className="user-form-section">
      <div className="container">
        <motion.div
          className="form-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="form-title">Get In Touch</h2>
          <p className="form-subtitle">
            Fill out the form below and we'll reach out to you soon!
          </p>
          <form onSubmit={handleSubmit} className="form">
            {/* Dynamically render form fields from API */}
            {formFields.map((field) => renderFormField(field))}
            
            {/* Always show group selection when fields exist */}
            {formFields.length > 0 && (
              <div className="form-group">
                <label htmlFor="groupId">Interested Group</label>
                <select
                  id="groupId"
                  name="groupId"
                  value={formData.groupId || ''}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select a group (optional)</option>
                  {groups.map((group) => (
                    <option key={group._id} value={group._id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <motion.button
              type="submit"
              className="submit-button"
              disabled={submitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {submitting ? (
                'Submitting...'
              ) : (
                <>
                  Submit <FaPaperPlane />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default UserForm;

