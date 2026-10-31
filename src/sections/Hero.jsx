import { useEffect, useRef } from 'react';
import { profile } from '../data/profile';
import './Hero.css';

/**
 * Hero section – Reference Recreation
 * Exact match to reference image:
 *   • Mobile: Two-column header (Typography left, Portrait right),
 *             full-width action buttons below.
 *   • Desktop: Two-column editorial layout with smooth portrait integration.
 *   • Distinct glowing aura behind head/shoulders in dark mode.
 *   • Smooth bottom gradient mask fade on portrait.
 */
export default function Hero() {
  const contentRef = useRef(null);
  const portraitRef = useRef(null);
  const actionsRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = [
      { ref: contentRef, delay: 100 },
      { ref: portraitRef, delay: 200 },
      { ref: actionsRef, delay: 300 },
      { ref: scrollRef, delay: 450 },
    ];

    if (prefersReduced) {
      elements.forEach(({ ref }) => {
        if (ref.current) {
          ref.current.style.opacity = '1';
          ref.current.style.transform = 'none';
        }
      });
      return;
    }

    elements.forEach(({ ref, delay }) => {
      if (!ref.current) return;
      setTimeout(() => ref.current?.classList.add('hero__animate-in'), delay);
    });
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      {/* Background with subtle natural grid texture */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grid" />
      </div>

      <div className="container hero__container">
        {/* Left Side: Editorial Typography */}
        <div ref={contentRef} className="hero__content">
          <p className="hero__greeting">HELLO, I'M</p>
          <h1 className="hero__name">
            <span className="hero__name-first">Nirbhay</span>
            <span className="hero__name-last">Patil</span>
          </h1>
          <p className="hero__subtitle">{profile.role}</p>

          <p className="hero__description">{profile.tagline}</p>

          <p className="hero__location">
            <svg
              className="hero__loc-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{profile.location}</span>
          </p>
        </div>

        {/* Right Side: Portrait with Soft Asymmetrical Sage Backdrop */}
        <div ref={portraitRef} className="hero__portrait-area">
          {/* Radiant green ambient glow behind head and shoulders */}
          <div className="hero__sage-backdrop" aria-hidden="true" />

          {/* Portrait Container with progressive bottom fade mask */}
          <div className="hero__portrait-wrapper">
            <img
              src="/Full Stack Developer Portrait (1).png"
              alt="Portrait of Nirbhay Patil"
              loading="eager"
              className="hero__portrait-img"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div ref={actionsRef} className="hero__actions">
          <a
            href={profile.resumeUrl}
            className="hero__btn hero__btn--primary"
            download
            aria-label="Download resume PDF"
          >
            DOWNLOAD RESUME
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hero__btn hero__btn--outline"
            aria-label={`Send email to ${profile.email}`}
          >
            GET IN TOUCH
          </a>
          <a
            href={profile.github}
            className="hero__btn hero__btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub profile (opens in new tab)"
          >
            <svg className="hero__github-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GITHUB</span>
            <svg className="hero__external-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>

          {/* Desktop scroll explore hint */}
          <div ref={scrollRef} className="hero__scroll">
            <button
              onClick={scrollToAbout}
              className="hero__scroll-btn"
              aria-label="Scroll to explore"
            >
              <span className="hero__scroll-text">SCROLL TO EXPLORE</span>
              <span className="hero__scroll-arrow" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
