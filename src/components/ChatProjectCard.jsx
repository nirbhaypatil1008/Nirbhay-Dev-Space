import { Link } from 'react-router-dom';
import { getProjectById } from '../data/projects';
import './ChatProjectCard.css';

export default function ChatProjectCard({ projectId, onNavigate }) {
  const project = getProjectById(projectId);
  if (!project) return null;

  return (
    <article className="chat-project-card" aria-label={`Project: ${project.title}`}>
      <div className="chat-project-card__header">
        <span
          className={`badge ${
            project.status === 'In Progress' ? 'badge-status-progress' : 'badge-status'
          }`}
        >
          {project.status}
        </span>
        <span className="chat-project-card__badge-verified" title="Verified Portfolio Project">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Verified
        </span>
      </div>

      <h4 className="chat-project-card__title">{project.title}</h4>
      <p className="chat-project-card__desc">{project.shortDescription}</p>

      {/* Tech stack */}
      <div className="chat-project-card__tech" aria-label="Technologies">
        {project.technologies.slice(0, 5).map((tech) => (
          <span key={tech} className="badge badge-accent">
            {tech}
          </span>
        ))}
      </div>

      {/* Links and Actions */}
      <div className="chat-project-card__actions">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-project-card__btn chat-project-card__btn--repo"
            aria-label={`View GitHub repository for ${project.title} (opens in new tab)`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </a>
        ) : (
          <span className="chat-project-card__link-muted" title="Repository not yet public">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Private
          </span>
        )}

        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-project-card__btn chat-project-card__btn--demo"
            aria-label={`View live demo for ${project.title} (opens in new tab)`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Demo
          </a>
        ) : null}

        <Link
          to={`/projects/${project.id}`}
          className="chat-project-card__btn chat-project-card__btn--detail"
          onClick={() => onNavigate && onNavigate()}
          aria-label={`View full details for ${project.title}`}
        >
          Details
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

