'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/pages/generateText', label: 'Generate Text' },
  { href: '/pages/streamText', label: 'Stream Text' },
  { href: '/pages/sentiment', label: 'Analyze Sentiment' },
  { href: '/pages/generateRecipe', label: 'Generate Recipe' },
  { href: '/pages/generateEmbed', label: 'Generate Embed' },
  { href: '/pages/chat', label: 'Simple chatbot' },
  { href: '/pages/weatherAgent', label: 'Weather Agent' },
  { href: '/pages/mcpAgent', label: 'MCP Agent' },
  { href: '/pages/chatTool', label: 'WORK IN PROGRESS: Chat Tool' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        className="hamburger-button"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
      </button>

      {isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <h2 className="sidebar-title">AI Demo</h2>
          <ul className="nav-list">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeSidebar}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
