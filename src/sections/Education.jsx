import { useScrollReveal } from '../hooks/useScrollReveal';
import { education } from '../data/profile';
import './Education.css';

export default function Education() {
  const headerRef = useScrollReveal();

  return (
    <section id="education" className="section section-alt education">
      <div className="container">
        <div ref={headerRef} className="education__header">
          <p className="section-label">Education</p>
          <h2 className="section-title">Academic background</h2>
        </div>

        <div className="education__list">
          {education.map((edu) => (
            <EducationCard key={edu.id} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ edu }) {
  const ref = useScrollReveal({ threshold: 0.15 });

  return (
    <article ref={ref} className="edu-card" aria-label={`${edu.degree} at ${edu.institution}`}>
      <div className="edu-card__left">
        <div className="edu-card__year">
          <span className="badge badge-accent">{edu.year}</span>
        </div>
        <div className="edu-card__line" aria-hidden="true" />
        <div className="edu-card__dot" aria-hidden="true" />
      </div>

      <div className="edu-card__body">
        <div className="edu-card__top">
          <span className={`badge ${edu.status === 'Pursuing' ? 'badge-status-progress' : 'badge-status'}`}>
            {edu.status}
          </span>
        </div>

        <h3 className="edu-card__degree">{edu.degree}</h3>
        {edu.field && <p className="edu-card__field">{edu.field}</p>}

        <div className="edu-card__meta">
          <div className="edu-card__institution">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            {edu.institution}
          </div>
          <div className="edu-card__location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {edu.location}
          </div>
        </div>

        {edu.description && (
          <p className="edu-card__desc">{edu.description}</p>
        )}
      </div>
    </article>
  );
}

