import React, { useState } from 'react';
import './TabNavigation.css';

const tabs = [
  { label: 'Agenda', icon: '🗓️' },
  { label: 'Speakers', icon: '🎤' },
  { label: 'Logistics', icon: '🚚' },
  { label: 'Past Events', icon: '📜' },
];

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="tab-nav-bar">
      {tabs.map((tab, idx) => (
        <button
          key={tab.label}
          className={`tab-btn${activeTab === idx ? ' active' : ''}`}
          onClick={() => setActiveTab(idx)}
        >
          <span className="tab-icon">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
