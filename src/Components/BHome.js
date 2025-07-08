import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/BHome.css";

const BHome = () => {
  const [location, setLocation] = useState("");
  const [bloodData, setBloodData] = useState([
    { bloodGroup: "A+", units: 0 },
    { bloodGroup: "A-", units: 0 },
    { bloodGroup: "B+", units: 0 },
    { bloodGroup: "B-", units: 0 },
    { bloodGroup: "AB+", units: 0 },
    { bloodGroup: "AB-", units: 0 },
    { bloodGroup: "O+", units: 0 },
    { bloodGroup: "O-", units: 0 },
  ]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");

  const handleUnitsChange = (index, value) => {
    const updated = [...bloodData];
    updated[index].units = parseInt(value, 10);
    setBloodData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = "Blood Bank - " + email.split("@")[0];

    try {
      const response = await axios.post("http://localhost:8000/register-bloodbank", {
        name,
        location,
        bloodAvailability: bloodData,
        userId,
        email,
      });

      if (response.data.success) {
        setMessage("✅ Blood bank data submitted successfully.");
        setLocation("");
        setBloodData((prev) => prev.map((b) => ({ ...b, units: 0 })));
      } else {
        setMessage("❌ Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting blood bank:", error);
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="bhome-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">🩸 BloodLink</div>
        <ul className="navbar-links">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/donate")}>Donate</li>
          <li onClick={() => navigate("/learn")}>Learn</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="bhome-design">
        <h2 className="headline">
          Save Lives, <span className="highlight">Donate Blood</span>
        </h2>
        <p className="subtext">
          Join thousands of heroes who donate blood regularly. Your contribution can
          save up to three lives and make a lasting impact in your community.
        </p>
        <div className="button-group">
          <button className="start-donating">Start Donating →</button>
          <button className="learn-more">Learn More</button>
        </div>

        {/* Features */}
        <div className="why-choose">
          <h3>Why Choose BloodLink?</h3>
          <div className="features">
            <div className="feature-card">
              <h4>🔒 Secure & Safe</h4>
              <p>Advanced security and screening protocols ensure complete safety.</p>
            </div>
            <div className="feature-card">
              <h4>🕒 24/7 Availability</h4>
              <p>Round-the-clock emergency support and supply.</p>
            </div>
            <div className="feature-card">
              <h4>✅ Certified Excellence</h4>
              <p>Accredited facilities with top medical standards.</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats">
          <div className="stat-item">❤ 50K+<br />Lives Saved</div>
          <div className="stat-item">🧑‍🤝‍🧑 25K+<br />Active Donors</div>
          <div className="stat-item">🏥 500+<br />Partner Hospitals</div>
          <div className="stat-item">✔ 99.99%<br />Success Rate</div>
        </div>

        {/* Articles */}
        <div className="latest-articles">
          <h3>Latest Articles</h3>
          <div className="articles">
            <div className="article-card">
              <img src="/img1.png" alt="Science of Blood Donation" />
              <p>The Science Behind Blood Donation</p>
              <a href="#">Read More →</a>
            </div>
            <div className="article-card">
              <img src="/img2.png" alt="Blood Compatibility" />
              <p>Blood Type Compatibility Made Simple</p>
              <a href="#">Read More →</a>
            </div>
            <div className="article-card">
              <img src="/img3.png" alt="Donation Prep" />
              <p>Preparing for Your Donation Day</p>
              <a href="#">Read More →</a>
            </div>
          </div>
        </div>

        {/* Form */}
        <h2 className="form-title">Register Blood Bank Availability</h2>
        <form className="bhome-form" onSubmit={handleSubmit}>
          <label>
            Area / Place:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>

          <h4>Blood Group Availability</h4>
          <div className="blood-groups">
            {bloodData.map((blood, index) => (
              <div key={blood.bloodGroup} className="blood-row">
                <label>{blood.bloodGroup}:</label>
                <input
                  type="number"
                  min="0"
                  value={blood.units}
                  onChange={(e) => handleUnitsChange(index, e.target.value)}
                />
                <span>units</span>
              </div>
            ))}
          </div>

          <button type="submit">Submit</button>
          {message && <p className="status-msg">{message}</p>}
        </form>

        
      </div>

      {/* Chatbot Icon - Fixed at Bottom Right */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#6200ea',
          borderRadius: '50%',
          width: '65px',
          height: '65px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        title="Chat with BloodLink Assistant"
        onClick={() => navigate('/chatbot')}
      >
        <span style={{ fontSize: '30px', color: '#fff' }}>🤖</span>
      </div>
      <footer className="footer">
  <p>Developed by Team BloodLink © 2025</p>
  <p>
    <a href="mailto:support@bloodlink.org">Contact Us</a> | 
    <a href="https://www.bloodlink.org/privacy">Privacy Policy</a>
  </p>
</footer>

    </div>
  );
};

export default BHome;