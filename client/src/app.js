// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import "./app.css";

/* ---------- LOGIN PAGE ---------- */
function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
    navigate("/dashboard");
  }

  return (
    <div className="container">
      <h1 className="title">Welcome to Flock Manager</h1>
      <p className="subtitle">Please log in to continue</p>

      <div className="card">
        <h2>Log In</h2>
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

/* ---------- DASHBOARD PAGE ---------- */
function Dashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="dashboard">
      {!menuOpen && (
        <button
          className="menu-toggle external"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      )}

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Flock Manager</h2>
          <button className="menu-toggle" onClick={() => setMenuOpen(false)}>
            ✖
          </button>
        </div>
        <nav>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Overview</Link>
          <Link to="/dashboard/members" onClick={() => setMenuOpen(false)}>Members</Link>
          <Link to="/dashboard/events" onClick={() => setMenuOpen(false)}>Events</Link>
          <Link to="/dashboard/reports" onClick={() => setMenuOpen(false)}>Reports</Link>
          <button className="btn" onClick={handleLogout}>Log Out</button>
        </nav>
      </aside>

      <main className="main-content">
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
      </main>
    </div>
  );
}

/* ---------- APP / ROUTER ---------- */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");

  // Sync login state across tabs
  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/dashboard/*"
          element={isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
