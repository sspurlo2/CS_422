// src/routes/AppRoutes.js
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
  const isLoggedIn = localStorage.getItem("loggedIn"); // simple auth check

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/events" element={<Events />} />
        <Route path="/members" element={<Member />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
