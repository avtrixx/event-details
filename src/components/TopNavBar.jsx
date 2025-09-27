import React from 'react';
import './TopNavBar.css';

export default function TopNavBar() {
  return (
    <nav className="top-navbar">
      <div className="nav-left">
        <span className="brand">JPMorganChase</span>
      </div>
      <div className="nav-right">
        <a href="#agenda" className="nav-link">Agenda</a>
        <a href="#speakers" className="nav-link">Speakers</a>
        <a href="#logistics" className="nav-link">Logistics</a>
        <a href="#faqs" className="nav-link">FAQs</a>
        <span className="nav-icon" title="Search">🔍</span>
        <span className="nav-icon" title="Notifications">🔔</span>
        <span className="nav-icon" title="Profile">👤</span>
        <span className="nav-icon" title="Settings">⚙️</span>
      </div>
    </nav>
  );
}
