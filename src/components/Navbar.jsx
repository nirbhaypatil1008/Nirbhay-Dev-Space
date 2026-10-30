import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { profile } from '../data/profile';
import './Navbar.css';

const navLinks = [
  { label: 'Home',      href: '/#hero' },
  { label: 'About',     href: '/#about' },
  { label: 'Skills',    href: '/#skills' },
  { label: 'Projects',  href: '/#projects' },
  { label: 'Education', href: '/#education' },
  { label: 'Contact',   href: '/#contact' },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Detect scroll for nav shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight active section via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== '/') return;
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [location.pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler, { passive: true });
      // Prevent background scrolling when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  }, [location.pathname]);

  const isOnHome = location.pathname === '/';

  const handleLinkClick = (href, sectionId) => {
    setMenuOpen(false);
    if (isOnHome && href.startsWith('/#')) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <nav className="navbar__inner container" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="Nirbhay Patil – Home">
          <span className="navbar__logo-mark" aria-hidden="true">NP</span>
          <span className="navbar__logo-text">{profile.name}</span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {navLinks.map(({ label, href }) => {
            const sectionId = href.replace('/#', '');
            const isActive = isOnHome && activeSection === sectionId;
            return (
              <li key={label}>
                <a
                  href={href}
                  className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => {
                    if (isOnHome && href.startsWith('/#')) {
                      e.preventDefault();
                      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Controls */}
        <div className="navbar__controls">
          <button
            className="navbar__theme-toggle"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="navbar__hamburger-line" aria-hidden="true" />
            <span className="navbar__hamburger-line" aria-hidden="true" />
            <span className="navbar__hamburger-line" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile backdrop overlay */}
      <div
        className={`navbar__mobile-backdrop${menuOpen ? ' navbar__mobile-backdrop--visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {navLinks.map(({ label, href }) => {
            const sectionId = href.replace('/#', '');
            const isActive = isOnHome && activeSection === sectionId;
            return (
              <li key={label}>
                <a
                  href={href}
                  className={`navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`}
                  onClick={(e) => {
                    if (isOnHome && href.startsWith('/#')) {
                      e.preventDefault();
                    }
                    handleLinkClick(href, sectionId);
                  }}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
