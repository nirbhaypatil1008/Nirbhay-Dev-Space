import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile';
import { TextEffect, TextLoop, Magnetic } from '../components/motion';
import './Hero.css';

/**
 * Hero section with Motion Primitives integration:
 *   • TextEffect: Subtle character/word entrance for greeting
 *   • Staggered motion reveals for name and description
 *   • TextLoop: Seamless vertical transition through professional role titles
 *   • Magnetic: Organic desktop cursor attraction for primary actions
 *   • Smooth scale & blur entrance for the portrait image
 */
export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16, filter: shouldReduceMotion ? 'none' : 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      {/* Background with subtle natural grid texture */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grid" />
      </div>

      <div className="container hero__container">
        {/* Left Side: Editorial Typography with Motion Primitives */}
        <motion.div
          className="hero__content"
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
        >
          <p className="hero__greeting">
            <TextEffect per="char" delay={0.05}>
              HELLO, I'M
            </TextEffect>
          </p>

          <h1 className="hero__name">
            <motion.span
              variants={itemFadeUp}
              className="hero__name-first"
            >
              Nirbhay
            </motion.span>
            <motion.span
              variants={itemFadeUp}
              className="hero__name-last"
            >
              Patil
            </motion.span>
          </h1>

          <motion.div variants={itemFadeUp} className="hero__subtitle">
            <TextLoop interval={3200}>
              <span>Full Stack Developer</span>
              <span>Software Engineering Student</span>
              <span>Backend &amp; API Builder</span>
              <span>Web Application Developer</span>
            </TextLoop>
          </motion.div>

          <motion.p variants={itemFadeUp} className="hero__description">
            {profile.tagline}
          </motion.p>

          <motion.p variants={itemFadeUp} className="hero__location">
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
          </motion.p>
        </motion.div>

        {/* Right Side: Portrait with Smooth Motion Primitives Entrance */}
        <motion.div
          className="hero__portrait-area"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 16, filter: shouldReduceMotion ? 'none' : 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
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
        </motion.div>

        {/* Action Buttons with Magnetic Desktop Pull and Micro-interactions */}
        <motion.div
          className="hero__actions"
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
        >
          <Magnetic intensity={0.15} range={65} style={{ width: '100%' }}>
            <motion.a
              href={profile.resumeUrl}
              className="hero__btn hero__btn--primary"
              download
              aria-label="Download resume PDF"
              whileHover={{ scale: 1.015, y: -1 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.15 }}
            >
              DOWNLOAD RESUME
            </motion.a>
          </Magnetic>

          <Magnetic intensity={0.15} range={65} style={{ width: '100%' }}>
            <motion.a
              href={`mailto:${profile.email}`}
              className="hero__btn hero__btn--outline"
              aria-label={`Send email to ${profile.email}`}
              whileHover={{ scale: 1.015, y: -1 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.15 }}
            >
              GET IN TOUCH
            </motion.a>
          </Magnetic>

          <Magnetic intensity={0.2} range={60}>
            <motion.a
              href={profile.github}
              className="hero__btn hero__btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub profile (opens in new tab)"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.15 }}
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
            </motion.a>
          </Magnetic>

          {/* Desktop scroll explore hint */}
          <div className="hero__scroll">
            <button
              onClick={scrollToAbout}
              className="hero__scroll-btn"
              aria-label="Scroll to explore"
            >
              <span className="hero__scroll-text">Scroll to explore</span>
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
        </motion.div>
      </div>
    </section>
  );
}
