import React from 'react';

const TABLE_DATA = [
  { time: '9:40 – 10:10 AM', session: 'Kickoff Address', presenter: 'Sandhya Sridharan – Global Head, AI4Tech', agenda: 'Opening Pulse Check & AI roadmap direction' },
  { time: '10:10 – 10:20 AM', session: 'Q&A Session', presenter: '—', agenda: 'Audience QnA' },
  { time: '10:20 – 10:30 AM', session: 'Speaker Bio', presenter: 'Emcee/s', agenda: 'Introducing the speaker' },
  { time: '10:30 – 11:00 AM', session: 'Keynote Address', presenter: 'TBD', agenda: 'Keynote Speech' },
  { time: '11:00 – 11:10 AM', session: 'Q&A Session', presenter: '—', agenda: 'Audience QnA' },
  { time: '12:00 – 12:30 PM', session: 'Talk 1', presenter: 'TBD', agenda: '—' },
  { time: '12:30 – 1:00 PM', session: 'Talk 2', presenter: 'TBD', agenda: '—' },
  { time: '1:00 – 2:00 PM', session: 'Lunch Break', presenter: '—', agenda: 'Networking Lunch' },
  { time: '2:00 – 2:15 PM', session: 'Audience Engagement', presenter: '—', agenda: 'Gamification' },
  { time: '2:15 – 2:25 PM', session: 'Session 2: Setting the Context', presenter: 'TBD', agenda: '—' },
  { time: '2:25 – 3:25 PM', session: 'Panel Discussion', presenter: 'TBD', agenda: '—' },
  { time: '3:25 – 3:30 PM', session: 'Q&A Session', presenter: '—', agenda: 'Audience QnA' },
  { time: '3:25 – 4:25 PM', session: 'Fireside Chat / AI Battlefield', presenter: 'TBD', agenda: 'Presidential debate-esque' },
  { time: '4:25 – 4:35 PM', session: 'Q&A Session', presenter: '—', agenda: 'Audience QnA' },
  { time: '4:35 – 4:45 PM', session: 'Closing Pulse Check', presenter: 'Emcee/s', agenda: 'Closing Pulse Check on Menti' },
  { time: '4:45 – 5:00 PM', session: 'Vote of Thanks', presenter: 'MK Ullah', agenda: '—' },
  { time: '5:00 – 6:00 PM', session: 'Hi-Tea & Networking', presenter: '—', agenda: '—' },
];

export default function EventDesktop({ eventDetails }) {
  return (
    <div className="event-details-panel">
      <h1>{eventDetails.name}</h1>
      <div className="event-subtitle">Bengaluru Tech Center</div>
      <div className="event-meta-row">
        <span className="event-meta-item"><strong>Date:</strong> October 16, 2025</span>
        <span className="event-meta-item"><strong>Time:</strong> 9 AM to 5 PM</span>
        <span className="event-meta-item"><strong>Location:</strong> JPMC Tower ETV, Bengaluru</span>
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
