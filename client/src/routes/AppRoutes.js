import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import AdminPanel from "../pages/adminPanel";
import Events from "../pages/events";
import Member from "../pages/member";
import Reports from "../pages/reports";
import NotFound from "../pages/notFound";

export default function AppRoutes() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/admin" element={isLoggedIn ? <AdminPanel /> : <Navigate to="/" />} />
        <Route path="/events" element={isLoggedIn ? <Events /> : <Navigate to="/" />} />
        <Route path="/members" element={isLoggedIn ? <Member /> : <Navigate to="/" />} />
        <Route path="/reports" element={isLoggedIn ? <Reports /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
