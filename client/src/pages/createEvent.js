import React, { useState } from "react";
import "../styles/CreateEvent.css";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
  });

  function handleChange(e) {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // TEMPORARY — replace with backend POST later
    console.log("Event Created:", eventData);

    // Navigate back to events page after creating
    navigate("/dashboard/events");
  }

  return (
    <div className="create-event-container">
      <h1 className="create-event-title">Create New Event</h1>

      <form className="create-event-form" onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          required
        />

        <label>Description (optional)</label>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;