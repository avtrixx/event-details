import { useState } from 'react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  const ADMIN_PASSWORD = 'avirag'; // Change this to a secure password

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      const saved = JSON.parse(localStorage.getItem('brokenBotSubmissions') || '[]');
      setSubmissions(saved);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(44,83,100,0.08)' }}>
      <h2 style={{ textAlign: 'center', color: '#8f5a39' }}>Admin: Winner List</h2>
      {!authenticated ? (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', marginTop: 24 }}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e0e0e0', fontSize: '1rem', width: 220 }}
            required
          />
          <button type="submit" style={{ background: '#8f5a39', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px', fontSize: '1rem', cursor: 'pointer', fontWeight: 600 }}>
            Login
          </button>
        </form>
      ) : (
        <div style={{ marginTop: 24 }}>
          {submissions.length === 0 ? (
            <div style={{ color: '#232e3b', textAlign: 'center' }}>No winners yet.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
              <thead>
                <tr style={{ background: '#f4efe7' }}>
                  <th style={{ padding: '8px', border: '1px solid #e0e0e0' }}>SID</th>
                  <th style={{ padding: '8px', border: '1px solid #e0e0e0' }}>Full Name</th>
                  <th style={{ padding: '8px', border: '1px solid #e0e0e0' }}>Prompt</th>
                  <th style={{ padding: '8px', border: '1px solid #e0e0e0' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: '8px', border: '1px solid #e0e0e0' }}>{s.sid}</td>
                    <td style={{ padding: '8px', border: '1px solid #e0e0e0' }}>{s.name}</td>
                    <td style={{ padding: '8px', border: '1px solid #e0e0e0', fontSize: '0.95rem' }}>{s.prompt}</td>
                    <td style={{ padding: '8px', border: '1px solid #e0e0e0', fontSize: '0.95rem' }}>{new Date(s.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
