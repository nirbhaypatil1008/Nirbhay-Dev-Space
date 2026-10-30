import { useEffect, useRef } from 'react';
import { profile } from '../data/profile';
import './Hero.css';

/**
 * Hero section – clean, editorial, balanced portfolio hero.
 * Layout:
 *   • Desktop – two-column, text on the left, naturally integrated portrait on the right.
 *   • Mobile – responsive vertical stack with proportional scaling.
 *   • Strictly NO borders, frames, cards, or outlines.
 *   • Clean typography and soft asymmetrical sage background shape.
 */
export default function Hero() {
  const contentRef = useRef(null);
  const portraitRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = [
      { ref: contentRef, delay: 100 },
      { ref: portraitRef, delay: 250 },
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
      {/* Background with very subtle grid texture */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grid" />
      </div>

      <div className="container hero__container">
        {/* Left Side: Editorial Typography & Actions */}
        <div ref={contentRef} className="hero__content">
          <p className="hero__greeting">HELLO, I'M</p>
          <h1 className="hero__name">{profile.name}</h1>
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

          <div className="hero__actions">
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
              GITHUB
            </a>
          </div>

          {/* Scroll explore hint pinned near bottom-left of hero */}
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

        {/* Right Side: Portrait with Soft Asymmetrical Sage Backdrop */}
        <div ref={portraitRef} className="hero__portrait-area">
          {/* Broad, soft, asymmetrical sage backdrop blending smoothly */}
          <div className="hero__sage-backdrop" aria-hidden="true" />

          {/* Portrait Container with smooth lower gradient mask fade */}
          <div className="hero__portrait-wrapper">
            <img
              src="/Full Stack Developer Portrait (1).png"
              alt="Portrait of Nirbhay Patil"
              loading="eager"
              className="hero__portrait-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
