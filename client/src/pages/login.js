import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // separate CSS for login page

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
    navigate("/dashboard");
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to Flock Manager</h1>
        <p className="login-subtitle">Please log in to continue</p>
        <button className="login-btn" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
