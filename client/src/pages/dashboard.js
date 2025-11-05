// pages/Dashboard.js
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Member from "./member"; // adjust the path if needed
// import Events from "./events";
// import Reports from "./reports";

function Dashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="btn toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "Close Menu" : "Menu"}
        </button>

        {sidebarOpen && (
          <>
            <h2>Flock Manager</h2>
            <nav>
              <Link to="/dashboard">Overview</Link>
              <Link to="/dashboard/members">Members</Link>
              <Link to="/dashboard/events">Events</Link>
              <Link to="/dashboard/reports">Reports</Link>
              <button className="btn" onClick={handleLogout}>
                Log Out
              </button>
            </nav>
          </>
        )}
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route
            path="/"
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
          {/* Add other nested routes like events, reports here */}
          {/* <Route path="events" element={<Events />} /> */}
          {/* <Route path="reports" element={<Reports />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
