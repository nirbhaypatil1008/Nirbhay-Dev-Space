import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { InView, AnimatedGroup } from '../components/motion';
import './Projects.css';

/**
 * Projects section with Motion Primitives
 *   • InView: Smooth entrance for section title and overview
 *   • AnimatedGroup: Staggered reveal for project cards
 *   • Tactile hover elevations on project cards & action links
 */
export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <InView
          className="projects__header"
          variants={{
            hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-desc">
            Real projects I've worked on—each one a hands-on opportunity to solve a problem and strengthen my technical skills.
          </p>
        </InView>

        <AnimatedGroup className="projects__grid" stagger={0.09}>
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </AnimatedGroup>

        {projects.length === 0 && (
          <div className="projects__empty">
            <p>No projects to display yet. Check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.article
      className="project-card"
      aria-label={project.title}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Status badge & icon links */}
      <div className="project-card__header">
        <span className={`badge ${project.status === 'In Progress' ? 'badge-status-progress' : 'badge-status'}`}>
          {project.status}
        </span>
        <div className="project-card__links-preview">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__icon-link"
              aria-label={`GitHub repository for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </motion.a>
          )}
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__icon-link"
              aria-label={`Live demo for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </motion.a>
          )}
        </div>
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.shortDescription}</p>

      {/* Tech stack */}
      <div className="project-card__tech" aria-label="Technologies used">
        {project.technologies.map((tech) => (
          <span key={tech} className="badge badge-accent">{tech}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="project-card__footer">
        <Link
          to={`/projects/${project.id}`}
          className="project-card__detail-link"
          aria-label={`View details for ${project.title}`}
        >
          View details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
