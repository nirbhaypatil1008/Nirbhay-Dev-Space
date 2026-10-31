import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { InView, AnimatedGroup, Magnetic } from '../components/motion';
import './About.css';

/**
 * About Section with Motion Primitives
 *   • InView reveals for editorial text & code illustration
 *   • AnimatedGroup staggered reveal for interest chips
 *   • Magnetic interaction for external social buttons
 */
export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__grid">
          {/* Text side with InView reveal */}
          <InView
            className="about__text"
            variants={{
              hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="section-label">ABOUT ME</p>
            <h2 className="section-title">Turning ideas into<br />working software.</h2>
            <div className="divider" />

            <p className="about__body">{profile.about}</p>

            <div className="about__meta">
              <div className="about__meta-item">
                <span className="about__meta-label">Location</span>
                <span className="about__meta-value">{profile.location}</span>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-label">Focus Area</span>
                <span className="about__meta-value">Full-Stack Web Development</span>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-label">Status</span>
                <span className="about__meta-value about__meta-value--available">
                  {profile.availability}
                </span>
              </div>
            </div>

            <div className="about__links">
              <Magnetic intensity={0.2} range={60}>
                <motion.a
                  href={profile.github}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View GitHub profile (opens in new tab)"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                  GitHub
                </motion.a>
              </Magnetic>

              <Magnetic intensity={0.2} range={60}>
                <motion.a
                  href={profile.linkedin}
                  className="btn btn-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View LinkedIn profile (opens in new tab)"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </motion.a>
              </Magnetic>
            </div>
          </InView>

          {/* Visual / interest side with InView & AnimatedGroup */}
          <InView
            className="about__visual"
            variants={{
              hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="about__card">
              <div className="about__card-header">
                <span className="about__card-dot" style={{background:'#ef4444'}} />
                <span className="about__card-dot" style={{background:'#f59e0b'}} />
                <span className="about__card-dot" style={{background:'#22c55e'}} />
              </div>
              <div className="about__card-content">
                <p className="about__card-comment">// What I enjoy working on</p>
                <p className="about__card-code">
                  <span className="about__code-keyword">const</span>{' '}
                  <span className="about__code-var">interests</span>{' '}
                  <span className="about__code-op">=</span> {'{'}
                </p>
                <p className="about__card-code about__card-code--indent">
                  <span className="about__code-key">backend</span>:{' '}
                  <span className="about__code-str">"REST APIs"</span>,
                </p>
                <p className="about__card-code about__card-code--indent">
                  <span className="about__code-key">database</span>:{' '}
                  <span className="about__code-str">"MySQL"</span>,
                </p>
                <p className="about__card-code about__card-code--indent">
                  <span className="about__code-key">frontend</span>:{' '}
                  <span className="about__code-str">"React"</span>,
                </p>
                <p className="about__card-code about__card-code--indent">
                  <span className="about__code-key">ai</span>:{' '}
                  <span className="about__code-str">"Generative AI"</span>,
                </p>
                <p className="about__card-code">{'};'}</p>
                <br/>
                <p className="about__card-code">
                  <span className="about__code-keyword">const</span>{' '}
                  <span className="about__code-var">goal</span>{' '}
                  <span className="about__code-op">=</span>{' '}
                  <span className="about__code-str">"Software Developer"</span>;
                </p>
              </div>
            </div>

            {/* Staggered chips via AnimatedGroup */}
            <AnimatedGroup className="about__interests" stagger={0.06}>
              {[
                { icon: '⚙', label: 'Backend Dev' },
                { icon: '🗄', label: 'Databases' },
                { icon: '🌐', label: 'Web Apps' },
                { icon: '🤖', label: 'AI Integration' },
              ].map(({ icon, label }) => (
                <div key={label} className="about__interest-tag">
                  <span aria-hidden="true">{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </AnimatedGroup>
          </InView>
        </div>
      </div>
    </section>
  );
}
