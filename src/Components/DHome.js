import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/DHome.css'; // optional CSS file

function DHome() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="donor-home">
      <h1>Welcome, Blood Bank!</h1>
      <p className="subtitle">Thank you for supporting lives through blood donations.</p>

      <div className="dashboard-options">
        <button onClick={() => handleNavigation('/add-stock')}>➕ Add New Blood Stock</button>
        <button onClick={() => handleNavigation('/view-stock')}>📦 View Blood Inventory</button>
        <button onClick={() => handleNavigation('/manage-requests')}>📨 Manage Requests</button>
        <button onClick={() => handleNavigation('/profile')}>👤 Update Profile</button>
        <button onClick={() => handleNavigation('/')}>🚪 Log Out</button>
      </div>
    </div>
  );
}

export default DHome;
