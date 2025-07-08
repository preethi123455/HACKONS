// src/pages/RequestHistory.js
import React from "react";

export default function RequestHistory() {
  const history = [
    { date: "05 July 2025", bloodGroup: "A+", status: "Fulfilled", donor: "Donor #122" },
    { date: "01 July 2025", bloodGroup: "B-", status: "Pending" },
    { date: "28 June 2025", bloodGroup: "AB+", status: "Rejected" },
  ];

  return (
    <div className="min-h-screen bg-white text-red-800 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-700">Request History</h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {history.map((entry, index) => (
          <div key={index} className="border p-4 rounded bg-white shadow">
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>Blood Group:</strong> {entry.bloodGroup}</p>
            <p><strong>Status:</strong> {entry.status}</p>
            {entry.donor && <p><strong>Donor:</strong> {entry.donor}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
