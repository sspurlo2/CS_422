// src/pages/reports.js
import React, { useState, useEffect } from "react";
import "../styles/Reports.css";

export default function Reports() {
  const [activeReport, setActiveReport] = useState(null);
  const [data, setData] = useState(null);

  const reportOptions = [
    { id: "membership", label: "Membership" },
    { id: "attendance", label: "Attendance" },
    { id: "workplace", label: "Workplace" },
    { id: "dues", label: "Dues" },
  ];

  // Fetch report data when a box is clicked
  useEffect(() => {
    if (!activeReport) return;

    fetch(`/api/reports/${activeReport}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, [activeReport]);

  return (
    <div className="reports-container">
      <h1 className="reports-title">Reports</h1>

      {/* Boxes */}
      <div className="reports-grid">
        {reportOptions.map((r) => (
          <div
            key={r.id}
            className={`report-box ${activeReport === r.id ? "active" : ""}`}
            onClick={() => setActiveReport(r.id)}
          >
            {r.label}
          </div>
        ))}
      </div>

      {/* Data Output */}
      {activeReport && (
        <div className="report-output">
          {!data ? (
            <p className="loading">Loading {activeReport} report...</p>
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}
