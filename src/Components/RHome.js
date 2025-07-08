import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ReceiverHomepage.css';

const ReceiverHomepage = () => {
  const navigate = useNavigate();

  return (
    <div className="receiver-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">RECEIVER</h1>
          <p className="hero-subtitle"></p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">2</span>
              <span className="stat-label">Active Requests</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Days Since Last Donation</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="blood-drop-icon">🩸</div>
        </div>
      </section>

      {/* Blood Types Needed Section */}
      <section className="blood-types-section">
        <div className="section-header">
          <h2>BLOOD TYPES NEEDED</h2>
          <div className="header-underline"></div>
        </div>
        <div className="blood-content">
          <div className="blood-info">
            <p className="blood-description">
              Many variables can impact our blood inventories such as weather, holidays or tragic events.
              Every day, patients who need blood are in crisis and <strong>you can help</strong> by volunteering to donate.
              Less than 10% of the population gives blood, so donors that give on a regular basis are important to meet these needs.
            </p>
            <button className="cta-button" onClick={() => navigate('/book-appointment')}>
              Book an appointment today!
            </button>
          </div>
          <div className="blood-types-grid">
            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(type => (
              <div key={type} className="blood-bag">
                <div className="bag-icon">{type}</div>
                <div className="urgency-indicator"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="quick-actions-section">
        <div className="section-header">
          <h2>QUICK ACTIONS</h2>
          <div className="header-underline"></div>
        </div>
        <div className="actions-grid">
          <div className="action-card primary" onClick={() => navigate('/request-blood')}>
            <div className="card-icon">🆘</div>
            <h3>Request Blood</h3>
            <p>Submit a new blood request and get immediate response from available donors.</p>
            <div className="card-arrow">→</div>
          </div>
          <div className="action-card" onClick={() => navigate('/matching-donors')}>
            <div className="card-icon">🔍</div>
            <h3>Matching Donors</h3>
            <p>Find the best matching blood donors based on availability and location.</p>
            <div className="card-arrow">→</div>
          </div>
          <div className="action-card" onClick={() => navigate('/request-history')}>
            <div className="card-icon">📋</div>
            <h3>Request History</h3>
            <p>Review your previous requests and their statuses.</p>
            <div className="card-arrow">→</div>
          </div>
          <div className="action-card" onClick={() => navigate('/profile-settings')}>
            <div className="card-icon">⚙️</div>
            <h3>Profile Settings</h3>
            <p>Update your personal information and preferences.</p>
            <div className="card-arrow">→</div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="emergency-banner">
        <div className="banner-content">
          <div className="banner-icon">🚨</div>
          <div className="banner-text">
            <h3>Emergency Blood Request</h3>
            <p>Need blood urgently? Our emergency response team is available 24/7</p>
          </div>
          <button className="emergency-button" onClick={() => navigate('/emergency-request')}>
            Emergency Request
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="receiver-footer">
        <div className="footer-content">
          <div className="footer-stats">
            <span>2 Active Blood Requests</span>
            <span>Last Donation Received: 3 Days Ago</span>
            <span>No new alerts</span>
          </div>
          <div className="footer-links">
            <span>© 2025 BloodBank Platform</span>
            <a href="/help">Help</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReceiverHomepage;