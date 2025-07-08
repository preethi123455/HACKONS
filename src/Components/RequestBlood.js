// src/pages/RequestBlood.js
import React from "react";
import "../Styles/RequestBlood.css";

export default function RequestBlood() {
  return (
    <div className="request-blood-container">
      {/* Header */}
      <header className="request-header">
        <h1>🩸 BloodBank Platform</h1>
        <p className="sub">Request for Blood</p>
        <p className="desc">Fill the form below to submit your urgent blood request</p>
      </header>

      {/* Form Section */}
      <main className="request-main">
        <div className="form-card">
          <h2>📝 Blood Request Form</h2>
          <p className="required">All fields marked with * are required</p>

          <form className="form-grid">
            {/* Patient Information */}
            <section>
              <h3>👤 Patient Information</h3>
              <div className="input-grid">
                <div>
                  <label>Patient Full Name*</label>
                  <input type="text" required />
                </div>
                <div>
                  <label>Gender*</label>
                  <select required>
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label>Date of Birth*</label>
                  <input type="date" required />
                </div>
                <div>
                  <label>Blood Group*</label>
                  <select required>
                    <option value="">Select Blood Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Attendee Info */}
            <section>
              <h3>👥 Attendee Information</h3>
              <div className="input-grid">
                <div>
                  <label>Attendee Full Name*</label>
                  <input type="text" required />
                </div>
                <div>
                  <label>Attendee Mobile*</label>
                  <input type="text" required />
                </div>
              </div>
            </section>

            {/* Blood Details */}
            <section>
              <h3>🧪 Blood Request Details</h3>
              <div className="input-grid">
                <div>
                  <label>Blood Type*</label>
                  <select required>
                    <option value="">Select Blood Type</option>
                    <option>Whole Blood</option>
                    <option>Platelets</option>
                    <option>Plasma</option>
                  </select>
                </div>
                <div>
                  <label>Quantity*</label>
                  <select required>
                    <option value="">Select Quantity</option>
                    <option>1 unit</option>
                    <option>2 units</option>
                    <option>3 units</option>
                    <option>More</option>
                  </select>
                </div>
                <div>
                  <label>Required Date*</label>
                  <input type="date" required />
                </div>
              </div>
            </section>

            {/* Location Info */}
            <section>
              <h3>📍 Location Information</h3>
              <div className="input-grid">
                <div>
                  <label>City*</label>
                  <select required>
                    <option value="">Select City</option>
                    <option>Bangalore</option>
                    <option>Mumbai</option>
                    <option>Chennai</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label>Location for Donation*</label>
                  <select required>
                    <option value="">Select Location</option>
                    <option>City Hospital</option>
                    <option>Red Cross</option>
                    <option>Blood Bank Center</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Upload */}
            <div>
              <label>📎 Requisition Form (Optional)</label>
              <input type="file" />
              <p className="hint">Accepted formats: PNG, JPG, DOCX, PDF, etc.</p>
            </div>

            <div className="btn-wrapper">
              <button type="submit">🩸 Submit Blood Request</button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="request-footer">
        <div className="footer-title">🩸 BloodBank Platform</div>
        <div className="footer-content">
          <div>
            <strong>Quick Links</strong><br />
            Home<br />
            About<br />
            Request Form<br />
            Contact
          </div>
          <div>
            <strong>Emergency Contact</strong><br />
            24/7 Helpline<br />
            +91-9876543210
          </div>
        </div>
        <div className="footer-copy">&copy; 2025 BloodBank Platform. All rights reserved.</div>
      </footer>
    </div>
  );
}