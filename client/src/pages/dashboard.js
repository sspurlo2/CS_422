// src/pages/dashboard.js
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Member from "./member";

function Dashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true); // keep sidebar open by default

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Flock Manager</h2>
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "✖" : "☰"}
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-link">Overview</Link>
          <Link to="/dashboard/members" className="nav-link">Members</Link>
          <Link to="/dashboard/events" className="nav-link">Events</Link>
          <Link to="/dashboard/reports" className="nav-link">Reports</Link>
          <button className="btn logout-btn" onClick={handleLogout}>Log Out</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route
            index
            element={
              <>
                <h1 className="title">Dashboard Overview</h1>
                <p className="subtitle">Welcome back! Here’s what’s happening today.</p>
                <div className="grid">
                  <div className="dashboard-card">
                    <h2>Member Updates</h2>
                    <ul className="notifications">
                      <li>Jane Doe renewed membership</li>
                      <li>John Smith attended last event</li>
                      <li>New member request: Alex Green</li>
                    </ul>
                  </div>

                  <div className="dashboard-card">
                    <h2>Event Summary</h2>
                    <p>3 upcoming events</p>
                    <p>Last event attendance: 85%</p>
                  </div>
                </div>
              </>
            }
          />
          <Route path="members" element={<Member />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
