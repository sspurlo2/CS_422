import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./app.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Welcome to Flock Manager</h1>
      <p className="subtitle">Please log in or create an account to continue</p>

      <div className="card">
        <h2>Log In</h2>
        <button className="btn" onClick={() => navigate("/")}>Login</button>

        <h3>OR</h3>

        <h2>Create Account</h2>
        <button className="btn" onClick={() => navigate("/")}>Create Account</button>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="container">
      <h1 className="title">Flock Manager</h1>
      <p className="subtitle">Member Management Dashboard</p>

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Log Out</Link>
      </nav>

      <div className="grid">
        {/* Profile Card */}
        <div className="card">
          <h2>Profile</h2>
          <p>Student ID: 123456</p>
          <p>Role: Member</p>
          <p>Workplace: Library</p>
          <p>Grad Year: 2026</p>
        </div>

        {/* Members Table */}
        <div className="card">
          <h2>Members</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Year</th>
                <th>Membership Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jane Doe</td>
                <td>Senior</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>John Smith</td>
                <td>Junior</td>
                <td>Inactive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
