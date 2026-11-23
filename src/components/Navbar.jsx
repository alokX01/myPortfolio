import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioData as data } from '../data/portfolioData.js';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar({ theme, onThemeChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#about');

  useEffect(() => {
    const sections = data.navigation.links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(`#${visible.target.id}`);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label={data.navigation.ariaLabel}>
        <a className="brand-mark" href="#top" aria-label={`${data.hero.name} home`} onClick={closeMenu}>
          {data.navigation.brand}<span>.</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} id="primary-navigation">
          {data.navigation.links.map((link) => (
            <a
              href={link.href}
              key={link.href}
              className={`nav-link ${activeSection === link.href ? 'nav-link--active' : ''}`}
              aria-current={activeSection === link.href ? 'location' : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <ThemeToggle theme={theme} onChange={onThemeChange} />
          <button
            className="icon-button menu-toggle"
            type="button"
            aria-label={data.navigation.menuLabel}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
