import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate
import '../Styles/DHome.css';

const DonorHome = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    aadhar: null,
    bloodType: '',
    phone: '',
  });

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        name: formData.name,
        location: formData.location,
        aadhar: formData.aadhar ? formData.aadhar.name : 'N/A',
        bloodType: formData.bloodType,
        phone: formData.phone,
      };

      const response = await axios.post('http://localhost:5000/api/donors', dataToSend);

      alert('Form submitted successfully!');
      console.log('✅ Response:', response.data);

      // Reset the form
      setFormData({
        name: '',
        location: '',
        aadhar: null,
        bloodType: '',
        phone: '',
      });
    } catch (error) {
      console.error('❌ Submission error:', error.response?.data || error.message);
      alert('Submission failed. Please check the console.');
    }
  };

  return (
    <div className="donor-container">
      <h1 className="donor-title">Welcome Donor ❤️</h1>
      <p className="donor-description">
        Thank you for choosing to save lives. Please register your details so we can reach you when needed.
      </p>

      {/* ✅ Floating Chatbot Button */}
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

      <form className="donor-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </label>

        <label>
          Location
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            placeholder="Your city or area"
          />
        </label>

        <label>
          Aadhaar Proof (PDF/Image)
          <input
            type="file"
            name="aadhar"
            accept=".pdf, image/*"
            onChange={handleChange}
          />
        </label>

        <label>
          Blood Type
          <select
            name="bloodType"
            required
            value={formData.bloodType}
            onChange={handleChange}
          >
            <option value="">Select your blood type</option>
            <option value="A+">A+</option>
            <option value="A-">A−</option>
            <option value="B+">B+</option>
            <option value="B-">B−</option>
            <option value="O+">O+</option>
            <option value="O-">O−</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB−</option>
          </select>
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            required
            pattern="[0-9]{10}"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile number"
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DonorHome;
