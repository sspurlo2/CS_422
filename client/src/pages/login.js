import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email or ID.");
      return;
    }

    // Temporary mock login logic
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
    navigate("/dashboard");
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to Flock Manager</h1>
        <p className="login-subtitle">Enter your email to continue</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="UO Email or 95#"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;