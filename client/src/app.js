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
    // Simulate login
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true); // update state
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

function Dashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // toggle sidebar

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Toggle Button */}
        <button
          className="btn toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Close Menu" : "Menu"}
        </button>

        {/* Sidebar content only shows when open */}
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
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  // Optional: sync login state across tabs
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
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/dashboard/*"
          element={
            isLoggedIn ? (
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
