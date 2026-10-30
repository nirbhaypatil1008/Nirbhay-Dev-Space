import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import './Footer.css';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-mark" aria-hidden="true">NP</span>
              <span className="footer__logo-text">{profile.name}</span>
            </Link>
            <p className="footer__tagline">{profile.role} · {profile.location}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <div className="footer__nav-group">
              <p className="footer__nav-title">Navigation</p>
              <ul role="list">
                {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`/#${item.toLowerCase()}`}
                      className="footer__link"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__nav-group">
              <p className="footer__nav-title">Connect</p>
              <ul role="list">
                <li>
                  <a
                    href={profile.github}
                    className="footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedin}
                    className="footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="footer__link"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__nav-group">
              <p className="footer__nav-title">Legal</p>
              <ul role="list">
                <li>
                  <Link to="/privacy" className="footer__link">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="footer__link">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="footer__built">
            Built with React &amp; Vite · Forest Editorial Theme
          </p>
        </div>
      </div>
    </footer>
  );
}

