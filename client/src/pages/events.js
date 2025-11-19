import React from "react";
import "../styles/Events.css";
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();

  // Temporary mock data — replace with backend later
  const upcomingEvents = [
    { id: 1, name: "General Meeting", date: "2025-02-15", location: "EMU" },
    { id: 2, name: "Office Hours", date: "2025-02-20", location: "Library" },
  ];

  const pastEvents = [
    { id: 3, name: "Union Workshop", date: "2025-01-10", location: "Central Kitchen" },
    { id: 4, name: "Holiday Gathering", date: "2024-12-15", location: "EMU Ballroom" },
  ];

  return (
    <div className="events-container">

      {/* CREATE EVENT BUTTON */}
      <button
        className="create-event-btn"
        onClick={() => navigate("/dashboard/events/create")}
      >
        + Create Event
      </button>

      {/* UPCOMING EVENTS */}
      <h1 className="events-title">Upcoming Events</h1>

      <div className="events-grid">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h2>{event.name}</h2>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>

              <button
                className="event-btn"
                onClick={() => navigate(`/dashboard/events/${event.id}`)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="empty-text">No upcoming events.</p>
        )}
      </div>

      {/* PAST EVENTS */}
      <h1 className="events-title">Past Events</h1>

      <div className="events-grid">
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => (
            <div key={event.id} className="event-card past">
              <h2>{event.name}</h2>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>

              <button
                className="event-btn past"
                onClick={() => navigate(`/dashboard/events/${event.id}`)}
              >
                View Summary
              </button>
            </div>
          ))
        ) : (
          <p className="empty-text">No past events.</p>
        )}
      </div>
    </div>
  );
}

export default Events;
