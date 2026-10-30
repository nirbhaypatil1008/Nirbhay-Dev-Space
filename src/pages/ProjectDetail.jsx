import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getProjectById, projects } from '../data/projects';
import { profile } from '../data/profile';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id);
  const headerRef = useScrollReveal();
  const bodyRef = useScrollReveal({ threshold: 0.1 });

  if (!project) {
    return (
      <main className="container project-detail__not-found">
        <Helmet>
          <title>Project Not Found — {profile.name}</title>
        </Helmet>
        <div>
          <p className="section-label">404</p>
          <h1>Project not found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <div style={{ marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)' }}>
            <Link to="/#projects" className="btn btn-primary">Back to Projects</Link>
            <Link to="/" className="btn btn-ghost">Go Home</Link>
          </div>
        </div>
      </main>
    );
  }

  // Adjacent projects
  const currentIdx = projects.findIndex((p) => p.id === id);
  const prevProject = currentIdx > 0 ? projects[currentIdx - 1] : null;
  const nextProject = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null;

  return (
    <>
      <Helmet>
        <title>{project.title} — {profile.name}</title>
        <meta name="description" content={project.shortDescription} />
        <meta property="og:title" content={`${project.title} — ${profile.name}`} />
        <meta property="og:description" content={project.shortDescription} />
        <meta property="og:type" content="article" />
      </Helmet>

      <main className="project-detail">
        {/* Back link */}
        <div className="project-detail__back-bar">
          <div className="container">
            <Link to="/#projects" className="project-detail__back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to projects
            </Link>
          </div>
        </div>

        <div className="container">
          {/* Hero header */}
          <header ref={headerRef} className="project-detail__header">
            <div className="project-detail__meta-top">
              <span className={`badge ${project.status === 'In Progress' ? 'badge-status-progress' : 'badge-status'}`}>
                {project.status}
              </span>
            </div>

            <h1 className="project-detail__title">{project.title}</h1>
            <p className="project-detail__lead">{project.shortDescription}</p>

            {/* Tech stack */}
            <div className="project-detail__tech-row" aria-label="Technologies used">
              {project.technologies.map((tech) => (
                <span key={tech} className="badge badge-accent">{tech}</span>
              ))}
            </div>

            {/* Links */}
            <div className="project-detail__link-row">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View GitHub repository (opens in new tab)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                  View Repository
                </a>
              ) : (
                <span className="project-detail__no-link" aria-label="Repository not yet public">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Repository not yet public
                </span>
              )}

              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View live demo (opens in new tab)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Demo
                </a>
              ) : (
                <span className="project-detail__no-link" aria-label="No live demo available">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  No live demo available
                </span>
              )}
            </div>
          </header>

          {/* Body content */}
          <div ref={bodyRef} className="project-detail__body">
            {/* Full description */}
            <section className="project-detail__section">
              <h2 className="project-detail__section-title">About this project</h2>
              <div className="project-detail__description">
                {project.fullDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <section className="project-detail__section">
                <h2 className="project-detail__section-title">Key highlights</h2>
                <ul className="project-detail__highlights" role="list">
                  {project.highlights.map((h) => (
                    <li key={h} className="project-detail__highlight">
                      <span className="project-detail__highlight-dot" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tech detail */}
            <section className="project-detail__section">
              <h2 className="project-detail__section-title">Technology stack</h2>
              <div className="project-detail__tech-grid">
                {project.technologies.map((tech) => (
                  <div key={tech} className="project-detail__tech-item">
                    <span className="project-detail__tech-name">{tech}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Navigation */}
          <nav className="project-detail__nav" aria-label="Adjacent projects">
            <div className="project-detail__nav-inner">
              {prevProject ? (
                <Link to={`/projects/${prevProject.id}`} className="project-detail__nav-link project-detail__nav-link--prev">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12 19 5 12 12 5"/>
                  </svg>
                  <div>
                    <span className="project-detail__nav-label">Previous</span>
                    <span className="project-detail__nav-title">{prevProject.title}</span>
                  </div>
                </Link>
              ) : (
                <span />
              )}
              {nextProject ? (
                <Link to={`/projects/${nextProject.id}`} className="project-detail__nav-link project-detail__nav-link--next">
                  <div>
                    <span className="project-detail__nav-label">Next</span>
                    <span className="project-detail__nav-title">{nextProject.title}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </nav>
        </div>
      </main>
    </>
  );
}

