import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ViewEvent.css";

// TEMPORARY mock data — replace with backend later
const mockEvents = [
  { id: "1", name: "General Meeting", date: "2025-02-15", location: "EMU", description: "Monthly union meeting." },
  { id: "2", name: "Office Hours", date: "2025-02-20", location: "Library", description: "Open support & discussion." },
  { id: "3", name: "Union Workshop", date: "2025-01-10", location: "Central Kitchen", description: "Training session." },
  { id: "4", name: "Holiday Gathering", date: "2024-12-15", location: "EMU Ballroom", description: "End-of-year celebration." }
];

function ViewEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find event using its ID
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="view-event-container">
        <h1 className="view-event-title">Event Not Found</h1>
        <button className="back-btn" onClick={() => navigate("/dashboard/events")}>
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="view-event-container">
      <h1 className="view-event-title">{event.name}</h1>

      <div className="event-details-card">
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>

        {event.description && (
          <p>
            <strong>Description:</strong> {event.description}
          </p>
        )}
      </div>

      <button className="back-btn" onClick={() => navigate("/dashboard/events")}>
        ⬅ Back to Events
      </button>
    </div>
  );
}

export default ViewEvent;
