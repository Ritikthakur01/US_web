import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import AnnouncementBar from './components/AnnouncementBar';
import Banner from './components/Banner';
import Groups from './components/Groups';
import UserForm from './components/UserForm';
import GroupDetail from './components/GroupDetail';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FAQButton from './components/FAQButton';
import Footer from './components/Footer';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTheme = async () => {
    try {
      const response = await axios.get(`${API_URL}/theme`);
      applyTheme(response.data.colors);
    } catch (error) {
      console.error('Error fetching theme:', error);
      // Default theme
      const defaultTheme = {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#10B981',
        background: '#FFFFFF',
        text: '#1F2937',
        textLight: '#6B7280',
      };
      applyTheme(defaultTheme);
    } finally {
      setLoading(false);
    }
  };

  const applyTheme = (colors) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-text-light', colors.textLight);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <AnnouncementBar />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <div id="about">
                  <About />
                </div>
                <div id="services">
                  <Services />
                </div>
                <div id="why-choose-us">
                  <WhyChooseUs />
                </div>
                <div id="groups">
                  <Groups />
                </div>
                <div id="testimonials">
                  <Testimonials />
                </div>
                <div id="get-in-touch">
                  <UserForm />
                </div>
              </>
            }
          />
          <Route path="/group/:id" element={<GroupDetail />} />
        </Routes>
        <FAQButton />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;

