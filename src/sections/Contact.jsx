import { useScrollReveal } from '../hooks/useScrollReveal';
import { profile } from '../data/profile';
import './Contact.css';

export default function Contact() {
  const headerRef = useScrollReveal();

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div ref={headerRef} className="contact__header">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's connect</h2>
          <p className="section-desc">
            I'm actively looking for entry-level opportunities and internships. If you have a project, a role, or just want to talk tech — reach out.
          </p>
        </div>

        <div className="contact__grid">
          {/* Email card */}
          <div className="contact__card">
            <div className="contact__card-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className="contact__card-title">Email me</h3>
            <p className="contact__card-value">{profile.email}</p>
            <div className="contact__card-actions">
              <a
                href={`mailto:${profile.email}`}
                className="btn btn-primary"
                aria-label={`Send email to ${profile.email}`}
              >
                Send Email
              </a>
            </div>
          </div>

          {/* GitHub card */}
          <div className="contact__card">
            <div className="contact__card-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </div>
            <h3 className="contact__card-title">GitHub</h3>
            <p className="contact__card-value">@nirbhaypatil1008</p>
            <a
              href={profile.github}
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub profile (opens in new tab)"
            >
              View Profile
            </a>
          </div>

          {/* LinkedIn card */}
          <div className="contact__card">
            <div className="contact__card-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </div>
            <h3 className="contact__card-title">LinkedIn</h3>
            <p className="contact__card-value">Nirbhay Patil</p>
            <a
              href={profile.linkedin}
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View LinkedIn profile (opens in new tab)"
            >
              Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

