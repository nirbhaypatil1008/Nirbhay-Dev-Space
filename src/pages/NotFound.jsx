import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { profile } from '../data/profile';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — {profile.name}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'var(--space-8)',
          paddingTop: 'var(--nav-height)',
        }}
      >
        <div>
          <p className="section-label" style={{ marginBottom: 'var(--space-4)' }}>404 Error</p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              marginBottom: 'var(--space-4)',
              color: 'var(--text-primary)',
            }}
          >
            Page not found
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-10)', maxWidth: '40ch', margin: '0 auto var(--space-10)' }}>
            The page you were looking for doesn't exist or may have been moved.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">Go Home</Link>
            <Link to="/#projects" className="btn btn-ghost">View Projects</Link>
          </div>
        </div>
      </main>
    </>
  );
}

