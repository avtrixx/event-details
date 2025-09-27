import React from 'react';
import './RightSidebar.css';

const links = [
  { icon: '🗓️', label: 'Add to Calendar', href: '#' },
  { icon: '📄', label: 'Download Agenda (PDF)', href: '#' },
  { icon: '📍', label: 'View Venue Map', href: '#' },
  { icon: '📨', label: 'Contact Organizer', href: '#' },
];

export default function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <h3 className="sidebar-title">Popular Links</h3>
      <ul className="sidebar-links">
        {links.map((link, idx) => (
          <li key={idx} className="sidebar-link-item">
            <a href={link.href} className="sidebar-link">
              <span className="sidebar-link-icon">{link.icon}</span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
