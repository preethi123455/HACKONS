import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/DiffBB.css";

export default function DiffBB() {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem("email"); // Get logged-in user's email

  useEffect(() => {
    axios
      .get("http://localhost:8000/fetch-all-bloodbanks")
      .then((res) => {
        // Filter out the blood bank with the logged-in user's email
        const filteredBanks = res.data.bloodBanks.filter(
          (bank) => bank.email !== userEmail
        );
        setBloodBanks(filteredBanks);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blood banks:", err);
        setLoading(false);
      });
  }, [userEmail]);

  return (
    <div className="diff-bb-container">
      <h2>All Other Blood Banks' Stock Availability</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bloodBanks.length === 0 ? (
        <p>No other blood bank data available.</p>
      ) : (
        <div className="bb-list">
          {bloodBanks.map((bank) => (
            <div className="bb-card" key={bank._id}>
              <h3>{bank.name}</h3>
              <p><strong>Location:</strong> {bank.location}</p>
              <p><strong>Email:</strong> {bank.email}</p>
              <table>
                <thead>
                  <tr>
                    <th>Blood Group</th>
                    <th>Units</th>
                  </tr>
                </thead>
                <tbody>
                  {bank.bloodAvailability.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.bloodGroup}</td>
                      <td>{entry.units}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
