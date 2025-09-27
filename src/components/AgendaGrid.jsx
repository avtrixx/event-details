import React from 'react';
import './AgendaGrid.css';

const agendaBlocks = [
  {
    session: 'Morning Session',
    items: [
      {
        time: '9:40 – 10:10 AM',
        title: 'Kickoff Address',
        presenter: 'Sandhya Sridharan – Global Head, AI4Tech',
        description: 'Opening Pulse Check & AI roadmap direction',
      },
      {
        time: '10:10 – 10:20 AM',
        title: 'Q&A Session',
        presenter: '—',
        description: 'Audience QnA',
      },
      {
        time: '10:20 – 10:30 AM',
        title: 'Speaker Bio',
        presenter: 'Emcee/s',
        description: 'Introducing the speaker',
      },
      {
        time: '10:30 – 11:00 AM',
        title: 'Keynote Address',
        presenter: 'TBD',
        description: 'Keynote Speech',
      },
      {
        time: '11:00 – 11:10 AM',
        title: 'Q&A Session',
        presenter: '—',
        description: 'Audience QnA',
      },
    ],
  },
  {
    session: 'Midday Sessions',
    items: [
      {
        time: '12:00 – 12:30 PM',
        title: 'Talk 1',
        presenter: 'TBD',
        description: '—',
      },
      {
        time: '12:30 – 1:00 PM',
        title: 'Talk 2',
        presenter: 'TBD',
        description: '—',
      },
      {
        time: '1:00 – 2:00 PM',
        title: 'Lunch Break',
        presenter: '—',
        description: 'Networking Lunch',
      },
    ],
  },
  {
    session: 'Afternoon Sessions',
    items: [
      {
        time: '2:00 – 2:15 PM',
        title: 'Audience Engagement',
        presenter: '—',
        description: 'Gamification',
      },
      {
        time: '2:15 – 2:25 PM',
        title: 'Session 2: Setting the Context',
        presenter: 'TBD',
        description: '—',
      },
      {
        time: '2:25 – 3:25 PM',
        title: 'Panel Discussion',
        presenter: 'TBD',
        description: '—',
      },
      {
        time: '3:25 – 3:30 PM',
        title: 'Q&A Session',
        presenter: '—',
        description: 'Audience QnA',
      },
      {
        time: '3:25 – 4:25 PM',
        title: 'Fireside Chat / AI Battlefield',
        presenter: 'TBD',
        description: 'Presidential debate-esque',
      },
    ],
  },
  {
    session: 'Evening Sessions',
    items: [
      {
        time: '4:25 – 4:35 PM',
        title: 'Q&A Session',
        presenter: '—',
        description: 'Audience QnA',
      },
      {
        time: '4:35 – 4:45 PM',
        title: 'Closing Pulse Check',
        presenter: 'Emcee/s',
        description: 'Closing Pulse Check on Menti',
      },
      {
        time: '4:45 – 5:00 PM',
        title: 'Vote of Thanks',
        presenter: 'MK Ullah',
        description: '—',
      },
      {
        time: '5:00 – 6:00 PM',
        title: 'Hi-Tea & Networking',
        presenter: '—',
        description: '—',
      },
    ],
  },
];

export default function AgendaGrid() {
  return (
    <div className="agenda-grid">
      {agendaBlocks.map((block) => (
        <div key={block.session} className="agenda-session">
          <h2 className="session-title">🕘 {block.session}</h2>
          <div className="session-cards">
            {block.items.map((item, idx) => (
              <div key={idx} className="agenda-card">
                <div className="agenda-time">{item.time}</div>
                <div className="agenda-title">{item.title}</div>
                <div className="agenda-presenter">{item.presenter}</div>
                <div className="agenda-desc">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
