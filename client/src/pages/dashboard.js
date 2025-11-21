// src/pages/dashboard.js
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import CreateEvent from "./createEvent";
import ViewEvent from "./viewEvent";

import Member from "./member";
import Events from "./events";
import Reports from "./reports";
import UOSWLogo from "../Images/UOSW_Logo.png";



<Route path="events" element={<Events />} />


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
        {/* Top Bar With Logo */}
  <div className="dashboard-topbar">
    <img src={UOSWLogo} alt="Union Logo" className="dashboard-logo-top" />
  </div>
      <Routes>
      <Route
        index
        element={
          <>
            <div className="dashboard-header">
            <h1 className="title">Dashboard Overview</h1>
          </div>

          <p className="subtitle">A quick look at your union activity</p>


            <div className="grid">

              {/* MEMBERSHIP SUMMARY */}
              <div className="dashboard-card">
                <h2>Membership Stats</h2>
                <ul className="notifications">
                  <li><strong>Total Members:</strong> 142</li>
                  <li><strong>Active Members:</strong> 119</li>
                  <li><strong>Dues Unpaid:</strong> 23</li>
                  <li><strong>Most Common Workplace:</strong> EMU</li>
                </ul>
              </div>

              {/* EVENTS SUMMARY */}
              <div className="dashboard-card">
                <h2>Event Summary</h2>
                <p><strong>Upcoming Events:</strong> 3</p>
                <p><strong>Last Attendance:</strong> 85%</p>
                <button className="btn" onClick={() => navigate("/dashboard/events")}>
                  View Events
                </button>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="dashboard-card">
                <h2>Recent Activity</h2>
                <ul className="notifications">
                  <li>✔ Jane Doe renewed membership</li>
                  <li>✔ John Smith attended Office Hours</li>
                  <li>➕ New member registered: Alex Green</li>
                </ul>
              </div>

              {/* QUICK ACTIONS */}
              <div className="dashboard-card">
                <h2>Quick Actions</h2>

                <div className="quick-actions-buttons">
                  <button className="btn" onClick={() => navigate("/dashboard/members")}>
                    Add Member
                  </button>
                  <button className="btn" onClick={() => navigate("/dashboard/events")}>
                    Create Event
                  </button>
                  <button className="btn" onClick={() => navigate("/dashboard/reports")}>
                    View Reports
                  </button>
                </div>

              </div>


            </div>
          </>
        }
      />

      {/* Members Page */}
      <Route path="members" element={<Member />} />
      <Route path="events" element={<Events />} />
      <Route path="events/create" element={<CreateEvent />} />
      <Route path="events/:id" element={<ViewEvent />} />
      <Route path="reports" element={<Reports />} />


      </Routes>
      </main>
      </div>
  );
}

export default Dashboard;