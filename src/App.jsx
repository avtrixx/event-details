
import { useState, useRef, useEffect } from 'react';
import './App.css';
import EventDesktop from './components/EventDesktop';
import EventMobile from './components/EventMobile';

import { EVENT_DETAILS, TABLE_DATA } from './assets/EventDetails';

import CHAT_BOT_ANSWERS from './assets/ChatBotAnswers';
import RESTRICTED_VULNERABILITIES from './assets/RestrictedVulnerabilities';


// RESTRICTED_VULNERABILITIES is now used for restricted keyword logic

function App() {
  const [chat, setChat] = useState([
    { sender: 'bot', text: 'Welcome! Ask me anything about the event.' },
  ]);
  const [input, setInput] = useState('');
  const [broken, setBroken] = useState(false);

  

  const handleSend = () => {
    if (!input.trim()) return;
    let botResponse = '';
    let lowerInput = input.toLowerCase();

    // Check if at least two keywords from any group are present in the input
    let isRestricted = RESTRICTED_VULNERABILITIES.some(group => {
      const matchCount = group.keys.reduce((acc, kw) => lowerInput.includes(kw.toLowerCase()) ? acc + 1 : acc, 0);
      return matchCount >= 2;
    });

    if (isRestricted) {
      botResponse = "Sorry, I can't share that information. (Restricted)";
      setBroken(true);
    } else {
      // Try to find a matching answer from the JSON
      const found = CHAT_BOT_ANSWERS.find(obj =>
        obj.keys.some(key => lowerInput.includes(key.toLowerCase()))
      );
      if (found) {
        if (found.dynamic && found.keys.includes('agenda')) {
          botResponse = 'Here is the agenda for the event:\n' + TABLE_DATA.map(row => `${row.time}: ${row.session} (${row.presenter}) - ${row.agenda}`).join('\n');
        } else if (found.dynamic && (found.keys.includes('presenter') || found.keys.includes('speaker bio'))) {
          botResponse = 'Presenters include: ' + TABLE_DATA.map(row => row.presenter).filter(p => p !== '—' && p !== 'TBD' && p !== 'Emcee/s').join(', ');
        } else {
          botResponse = found.answer;
        }
      } else {
        botResponse = "I'm here to help! Ask about sessions, presenters, agenda, or timings from the event details table.";
      }
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

  const [userDetails, setUserDetails] = useState({ sid: '', name: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [brokenPrompt, setBrokenPrompt] = useState('');

  // Save breaking prompt when bot is broken
  useEffect(() => {
    if (broken && chat.length > 1) {
      setBrokenPrompt(chat[chat.length - 2].text);
    }
  }, [broken]);

  // Save details to file (simulate with localStorage for now)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      sid: userDetails.sid,
      name: userDetails.name,
      prompt: brokenPrompt,
      timestamp: new Date().toISOString(),
    };
    // Simulate file save
    let saved = JSON.parse(localStorage.getItem('brokenBotSubmissions') || '[]');
    saved.push(data);
    localStorage.setItem('brokenBotSubmissions', JSON.stringify(saved));
    setFormSubmitted(true);
  };

  return (
    <div className="event-details-fullpage">
      {/* Hidden admin link for winner list */}
      <a href="/admin" style={{ position: 'absolute', top: 4, right: 8, fontSize: '0.01px', color: 'transparent', zIndex: 9999 }}>Admin</a>
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
              {isMobile ? (
                <button onClick={handleSend} aria-label="Send">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 20L21 12L3 4V10L15 12L3 14V20Z" fill="#fff"/>
                  </svg>
                </button>
              ) : (
                <button onClick={handleSend}>Send</button>
              )}
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
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', marginTop: '18px' }}>
                <p style={{ fontSize: '1.08rem', color: '#232e3b', marginBottom: '8px', textAlign: 'center' }}>
                  Please fill your details so our team can reach out to you.<br />
                  (SID & Full Name required)
                </p>
                <input
                  type="text"
                  placeholder="SID"
                  value={userDetails.sid}
                  onChange={e => setUserDetails({ ...userDetails, sid: e.target.value })}
                  required
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '1rem', width: '220px' }}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={userDetails.name}
                  onChange={e => setUserDetails({ ...userDetails, name: e.target.value })}
                  required
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '1rem', width: '220px' }}
                />
                <button type="submit" style={{ background: '#8f5a39', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 24px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600' }}>
                  Submit
                </button>
              </form>
            ) : (
              <div style={{ fontSize: '1.1rem', color: '#232e3b', textAlign: 'center', marginTop: '18px' }}>
                Thank you! Your details and prompt have been saved.<br />
                Our team will reach out to you soon.
                <br /><br />
                <button onClick={() => { setBroken(false); setFormSubmitted(false); setUserDetails({ sid: '', name: '' }); }} style={{ background: '#8f5a39', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 24px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600' }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
