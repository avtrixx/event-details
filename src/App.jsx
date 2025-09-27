
import { useState , useRef, useEffect} from 'react';
import './App.css';

const EVENT_DETAILS = {
  name: 'Corporate Tech Meet 2025',
  date: 'October 15, 2025',
  location: 'Grand Convention Center, New York',
  speakers: [
    'Dr. Jane Smith – AI Researcher',
    'John Doe – CTO, TechCorp',
    'Emily Chen – Cloud Architect',
  ],
  schedule: [
    { time: '09:00 AM', activity: 'Registration & Breakfast' },
    { time: '10:00 AM', activity: 'Opening Keynote: Dr. Jane Smith' },
    { time: '11:00 AM', activity: 'Panel: Future of AI' },
    { time: '12:30 PM', activity: 'Lunch Break' },
    { time: '01:30 PM', activity: 'Workshop: Cloud Innovations' },
    { time: '03:00 PM', activity: 'Networking & Closing' },
  ],
};

const RESTRICTED_KEYWORDS = [
  'payment',
  'amount',
  'confidential',
  'last-minute',
  'rescheduling',
  '4500',
  '$4500',
];

function App() {
  const [chat, setChat] = useState([
    { sender: 'bot', text: 'Welcome! Ask me anything about the event.' },
  ]);
  const [input, setInput] = useState('');
  const [broken, setBroken] = useState(false);

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

  const handleSend = () => {
    if (!input.trim()) return;
    let botResponse = '';
    let lowerInput = input.toLowerCase();
    let isRestricted = RESTRICTED_KEYWORDS.some((kw) => lowerInput.includes(kw));

    if (isRestricted) {
      botResponse = "Sorry, I can't share that information. (Restricted)";
      setBroken(true);
    } else if (lowerInput.includes('event name')) {
      botResponse = `The event is called Corporate Tech Meet 2025.`;
    } else if (lowerInput.includes('date')) {
      botResponse = `The event is on October 16, 2025.`;
    } else if (lowerInput.includes('location')) {
      botResponse = `The event will be held at JPMC Tower ETV, Bengaluru.`;
    } else if (lowerInput.includes('kickoff')) {
      botResponse = `Kickoff Address is at 9:40 – 10:10 AM by Sandhya Sridharan – Global Head, AI4Tech. Agenda: Opening Pulse Check & AI roadmap direction.`;
    } else if (lowerInput.includes('keynote')) {
      botResponse = `Keynote Address is at 10:30 – 11:00 AM. Presenter: TBD. Agenda: Keynote Speech.`;
    } else if (lowerInput.includes('lunch')) {
      botResponse = `Lunch Break is from 1:00 – 2:00 PM. Agenda: Networking Lunch.`;
    } else if (lowerInput.includes('panel')) {
      botResponse = `Panel Discussion is at 2:25 – 3:25 PM. Presenter: TBD.`;
    } else if (lowerInput.includes('fireside') || lowerInput.includes('battlefield')) {
      botResponse = `Fireside Chat / AI Battlefield is at 3:25 – 4:25 PM. Presenter: TBD. Agenda: Presidential debate-esque.`;
    } else if (lowerInput.includes('vote of thanks')) {
      botResponse = `Vote of Thanks is at 4:45 – 5:00 PM. Presenter: MK Ullah.`;
    } else if (lowerInput.includes('agenda')) {
      botResponse = 'Here is the agenda for the event:\n' + TABLE_DATA.map(row => `${row.time}: ${row.session} (${row.presenter}) - ${row.agenda}`).join('\n');
    } else if (lowerInput.includes('presenter') || lowerInput.includes('speaker bio')) {
      botResponse = 'Presenters include: ' + TABLE_DATA.map(row => row.presenter).filter(p => p !== '—' && p !== 'TBD' && p !== 'Emcee/s').join(', ');
    } else {
      botResponse = "I'm here to help! Ask about sessions, presenters, agenda, or timings from the event details table.";
    }
    setChat([...chat, { sender: 'user', text: input }, { sender: 'bot', text: botResponse }]);
    setInput('');
  };

  const [chatbotOpen, setChatbotOpen] = useState(false);

  // ...existing code...
  // Add click outside logic for chatbot
  const chatbotPanelRef = useRef(null);

  useEffect(() => {
    if (!chatbotOpen) return;
    function handleClickOutside(event) {
      if (chatbotPanelRef.current && !chatbotPanelRef.current.contains(event.target)) {
        setChatbotOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatbotOpen]);

  return (
    <div className="event-details-fullpage">
      <div className="event-details-panel">
        <h1>{EVENT_DETAILS.name}</h1>
        <div className="event-subtitle">Bengaluru Tech Center</div>
        <div className="event-meta-row">
          <span className="event-meta-item"><strong>Date:</strong> October 16, 2025</span>
          <span className="event-meta-item"><strong>Time:</strong> 9 AM to 5 PM</span>
          <span className="event-meta-item"><strong>Location:</strong> JPMC Tower ETV, Bengaluru</span>
        </div>

        <div className="event-details-table-section">
          <h2 className="event-details-table-title">Event Details</h2>
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
              <tr>
                <td>9:40 – 10:10 AM</td>
                <td>Kickoff Address</td>
                <td>Sandhya Sridharan – Global Head, AI4Tech</td>
                <td>Opening Pulse Check & AI roadmap direction</td>
              </tr>
              <tr>
                <td>10:10 – 10:20 AM</td>
                <td>Q&A Session</td>
                <td>—</td>
                <td>Audience QnA</td>
              </tr>
              <tr>
                <td>10:20 – 10:30 AM</td>
                <td>Speaker Bio</td>
                <td>Emcee/s</td>
                <td>Introducing the speaker</td>
              </tr>
              <tr>
                <td>10:30 – 11:00 AM</td>
                <td>Keynote Address</td>
                <td>TBD</td>
                <td>Keynote Speech</td>
              </tr>
              <tr>
                <td>11:00 – 11:10 AM</td>
                <td>Q&A Session</td>
                <td>—</td>
                <td>Audience QnA</td>
              </tr>
              <tr>
                <td>12:00 – 12:30 PM</td>
                <td>Talk 1</td>
                <td>TBD</td>
                <td>—</td>
              </tr>
              <tr>
                <td>12:30 – 1:00 PM</td>
                <td>Talk 2</td>
                <td>TBD</td>
                <td>—</td>
              </tr>
              <tr>
                <td>1:00 – 2:00 PM</td>
                <td>Lunch Break</td>
                <td>—</td>
                <td>Networking Lunch</td>
              </tr>
              <tr>
                <td>2:00 – 2:15 PM</td>
                <td>Audience Engagement</td>
                <td>—</td>
                <td>Gamification</td>
              </tr>
              <tr>
                <td>2:15 – 2:25 PM</td>
                <td>Session 2: Setting the Context</td>
                <td>TBD</td>
                <td>—</td>
              </tr>
              <tr>
                <td>2:25 – 3:25 PM</td>
                <td>Panel Discussion</td>
                <td>TBD</td>
                <td>—</td>
              </tr>
              <tr>
                <td>3:25 – 3:30 PM</td>
                <td>Q&A Session</td>
                <td>—</td>
                <td>Audience QnA</td>
              </tr>
              <tr>
                <td>3:25 – 4:25 PM</td>
                <td>Fireside Chat / AI Battlefield</td>
                <td>TBD</td>
                <td>Presidential debate-esque</td>
              </tr>
              <tr>
                <td>4:25 – 4:35 PM</td>
                <td>Q&A Session</td>
                <td>—</td>
                <td>Audience QnA</td>
              </tr>
              <tr>
                <td>4:35 – 4:45 PM</td>
                <td>Closing Pulse Check</td>
                <td>Emcee/s</td>
                <td>Closing Pulse Check on Menti</td>
              </tr>
              <tr>
                <td>4:45 – 5:00 PM</td>
                <td>Vote of Thanks</td>
                <td>MK Ullah</td>
                <td>—</td>
              </tr>
              <tr>
                <td>5:00 – 6:00 PM</td>
                <td>Hi-Tea & Networking</td>
                <td>—</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Speakers and Run of Show removed as requested */}
      </div>

      {/* Collapsible Chatbot Widget */}
      <div className={`chatbot-widget ${chatbotOpen ? 'open' : ''}`}>
        {chatbotOpen ? (
          <div className="chatbot-panel" ref={chatbotPanelRef}>
            <div className="chatbot-header">
              <h2>Event Assistant</h2>
              <button className="close-btn" onClick={() => setChatbotOpen(false)}>
                ×
              </button>
            </div>
            <div className="chat-window">
              {chat.map((msg, idx) => (
                <div key={idx} className={msg.sender === 'bot' ? 'bot-msg' : 'user-msg'}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input-row">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        ) : (
          <button className="open-chatbot-btn" onClick={() => setChatbotOpen(true)}>
            💬 Event Assistant
          </button>
        )}
      </div>

      {broken && (
        <div className="broken-popup">
          <div className="popup-content">
            <h2>Bot Broken!</h2>
            <p>
              You managed to break the bot by asking for restricted information.<br />
              (This is part of the challenge!)
            </p>
            <button onClick={() => setBroken(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
