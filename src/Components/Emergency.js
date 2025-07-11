import React, { useState } from 'react';
import axios from 'axios';

const Emergency = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    bloodGroup: '',
    units: '',
    hospitalAddress: '',
    mobileNumber: '',
    place: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/emergency-request', formData);
      setMessage(res.data.message || 'Emergency request sent successfully!');
      setFormData({
        recipientName: '',
        bloodGroup: '',
        units: '',
        hospitalAddress: '',
        mobileNumber: '',
        place: '',
      });
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to send emergency request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚨 Emergency Blood Request</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="recipientName"
          placeholder="Recipient Name"
          value={formData.recipientName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="bloodGroup"
          placeholder="Blood Group (e.g. A+)"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="units"
          type="number"
          placeholder="Units of Blood Needed"
          value={formData.units}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="hospitalAddress"
          placeholder="Hospital / Receiving Address"
          value={formData.hospitalAddress}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="place"
          placeholder="Place (City/Area)"
          value={formData.place}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Sending...' : 'Send Emergency Request'}
        </button>

        {message && <p style={{ ...styles.message, color: 'green' }}>{message}</p>}
        {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    background: '#fff3f3',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#b30000',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    background: '#b30000',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default Emergency;
