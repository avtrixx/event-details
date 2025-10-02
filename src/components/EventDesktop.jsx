import React from 'react';
import { EVENT_DETAILS, TABLE_DATA } from '../assets/EventDetails';

export default function EventDesktop({ eventDetails }) {
  return (
    <div className="event-details-panel">
      <h1>{EVENT_DETAILS.name}</h1>
      <div className="event-subtitle">{EVENT_DETAILS.location}</div>
      <div className="event-meta-row">
        <span className="event-meta-item"><strong>Date:</strong>{EVENT_DETAILS.date}</span>
        <span className="event-meta-item"><strong>Time:</strong> {EVENT_DETAILS.time}</span>
        <span className="event-meta-item"><strong>Location:</strong>{EVENT_DETAILS.location}</span>
      </div>
      <div className="event-details-table-section">
        <h2 className="event-details-table-title">Event Details</h2>
        <div style={{overflowX: 'auto'}}>
          <table className="event-details-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Session</th>
                <th>Presenter</th>
                <th>Agenda</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.time}</td>
                  <td>{row.session}</td>
                  <td>{row.presenter}</td>
                  <td>{row.agenda}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
