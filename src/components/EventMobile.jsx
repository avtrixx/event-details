import React from 'react';
import { EVENT_DETAILS, TABLE_DATA } from '../assets/EventDetails';

export default function EventMobile({ eventDetails }) {
  return (
    <div className="event-details-panel">
      <h1 className="event-header-mobile-centered">{EVENT_DETAILS.name}</h1>
      <div className="event-subtitle">{EVENT_DETAILS.location}</div>
      <div className="event-details-cards" style={{ marginBottom: '12px' }}>
        <div className="event-details-card">
          <div className="event-details-card-row"><strong>Date:</strong>{EVENT_DETAILS.date}</div>
          <div className="event-details-card-row"><strong>Time:</strong> {EVENT_DETAILS.time}</div>
          <div className="event-details-card-row"><strong>Location:</strong>{EVENT_DETAILS.location}</div>
        </div>
      </div>
      <div className="event-details-table-section">
        <h2 className="event-details-table-title">Event Details</h2>
        <div className="event-details-cards">
          {TABLE_DATA.map((row, idx) => (
            <div className="event-details-card" key={idx}>
              {Object.entries(row).map(([key, value]) => (
                <div className="event-details-card-row" key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
