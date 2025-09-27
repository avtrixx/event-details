import React from 'react';
import './MainHeader.css';

  return (
    <header className="main-header">
      <div className="main-header-center">
        <h1 className="main-title">🏷️ Tech Meetup 2025</h1>
        <p className="subtitle">Powered by <span className="brand-highlight">AI4Tech</span> and <span className="brand-highlight">Modernization Workstream</span></p>
        <div className="meta-info">
          <span className="meta-item"><span className="meta-icon">📅</span> October 16, 2025</span>
          <span className="meta-item"><span className="meta-icon">🕘</span> 9:00 AM – 5:00 PM</span>
          <span className="meta-item"><span className="meta-icon">📍</span> JPMC Towers, Embassy Tech Village, Bengaluru</span>
        </div>
      </div>
      <div className="main-header-divider" />
    </header>
  );
}
