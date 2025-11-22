import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
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

  const circularText = "UOSW • ".repeat(8);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-orbit-wrapper">
          <motion.svg
            className="login-orbit"
            viewBox="0 0 220 220"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 56, ease: "linear" }}
          >
            <defs>
              <path
                id="orbitPath"
                d="M 110,110 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
              />
            </defs>
            <text>
              <textPath href="#orbitPath" startOffset="50%" textAnchor="middle">
                {circularText}
              </textPath>
            </text>
          </motion.svg>

          <div className="login-header">
            <h1 className="login-title">Welcome to Flock Manager</h1>
            <p className="login-subtitle">Enter your email to continue</p>
          </div>
        </div>

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