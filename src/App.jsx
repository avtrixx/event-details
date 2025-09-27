
import { useState, useRef, useEffect } from 'react';
import './App.css';
import EventDesktop from './components/EventDesktop';
import EventMobile from './components/EventMobile';

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

  // Responsive: detect mobile
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

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="event-details-fullpage">
      {isMobile ? (
        <EventMobile eventDetails={EVENT_DETAILS} />
      ) : (
        <EventDesktop eventDetails={EVENT_DETAILS} />
      )}
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
