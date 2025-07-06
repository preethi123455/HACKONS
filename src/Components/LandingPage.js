import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LandingPage.css';

const images = [
  '/images/blood1.jpg',
  '/images/blood2.jpg',
  '/images/blood3.jpg',
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds fade cycle
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    navigate('/signup');
  };

  return (
    <div className="landing-container">
      <div className="fade-carousel">
        {images.map((src, index) => (
          <div
            key={index}
            className={`fade-slide ${index === current ? 'active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          ></div>
        ))}

        <div className="overlay">
          <h1>Welcome to <span>BloodLink</span></h1>
          <p>Connecting donors with lives in need</p>
          <button className="get-started-btn" onClick={handleStart}>
            Get Started →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
