import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { profile } from '../data/profile';
import './Legal.css';

const currentYear = new Date().getFullYear();

export function PrivacyPolicy() {

  return (
    <>
      <Helmet>
        <title>Privacy Policy — {profile.name}</title>
        <meta name="description" content={`Privacy policy for ${profile.name}'s portfolio website.`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="legal container">
        <div className="legal__back">
          <Link to="/" className="legal__back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to portfolio
          </Link>
        </div>

        <article className="legal__content">
          <header className="legal__header">
            <p className="section-label">Legal</p>
            <h1 className="legal__title">Privacy Policy</h1>
            <p className="legal__date">Last updated: {currentYear}</p>
          </header>

          <section className="legal__section">
            <h2>Overview</h2>
            <p>
              This privacy policy describes how this personal portfolio website, operated by {profile.name},
              handles any information that may be collected when you visit <strong>this site</strong>.
              This is a static personal portfolio with no user accounts, no tracking pixels, and no
              third-party advertising.
            </p>
          </section>

          <section className="legal__section">
            <h2>Information collected</h2>
            <p>
              This portfolio does <strong>not</strong> collect, store, or process personal information
              beyond what is inherently transmitted in standard HTTP requests (such as your IP address,
              which may be logged by the hosting provider). No forms collect personal data beyond
              your email client when you click a mailto link.
            </p>
          </section>

          <section className="legal__section">
            <h2>Third-party services</h2>
            <p>
              This site may use the following third-party resources:
            </p>
            <ul>
              <li><strong>Google Fonts</strong> — serves font files; Google may log requests per their own privacy policy.</li>
              <li><strong>Gemini API</strong> — if you use the AI assistant, your messages are sent to Google's Gemini API. No messages are stored by this portfolio. Refer to Google's privacy policy for Gemini API usage.</li>
              <li><strong>Hosting provider</strong> — standard server logs may be maintained by the hosting infrastructure.</li>
            </ul>
          </section>

          <section className="legal__section">
            <h2>Cookies and local storage</h2>
            <p>
              This site uses browser <code>localStorage</code> solely to remember your chosen
              light/dark theme preference. No cookies are set. No tracking or advertising data is stored.
            </p>
          </section>

          <section className="legal__section">
            <h2>External links</h2>
            <p>
              This site links to GitHub, LinkedIn, and other external services. Those services have
              their own privacy policies, which govern any data they collect.
            </p>
          </section>

          <section className="legal__section">
            <h2>Contact</h2>
            <p>
              If you have any questions about this policy, you may contact {profile.name} at{' '}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}

export function TermsAndConditions() {

  return (
    <>
      <Helmet>
        <title>Terms &amp; Conditions — {profile.name}</title>
        <meta name="description" content={`Terms and conditions for ${profile.name}'s portfolio website.`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="legal container">
        <div className="legal__back">
          <Link to="/" className="legal__back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to portfolio
          </Link>
        </div>

        <article className="legal__content">
          <header className="legal__header">
            <p className="section-label">Legal</p>
            <h1 className="legal__title">Terms &amp; Conditions</h1>
            <p className="legal__date">Last updated: {currentYear}</p>
          </header>

          <section className="legal__section">
            <h2>Acceptance</h2>
            <p>
              By accessing this portfolio website, you agree to be bound by these terms and conditions.
              If you do not agree, please do not use this website.
            </p>
          </section>

          <section className="legal__section">
            <h2>Use of content</h2>
            <p>
              All content on this portfolio — including text, code examples, and project descriptions — is
              provided for informational purposes. The content is the intellectual property of {profile.name}
              unless otherwise noted. You may not reproduce, redistribute, or use the content commercially
              without explicit written permission.
            </p>
          </section>

          <section className="legal__section">
            <h2>Project information</h2>
            <p>
              Project descriptions and technical details reflect the actual work completed by {profile.name}.
              No guarantee is made regarding the accuracy of any listed technologies, features, or project
              statuses beyond the knowledge available at the time of writing.
            </p>
          </section>

          <section className="legal__section">
            <h2>AI assistant</h2>
            <p>
              The AI assistant on this portfolio is powered by Google's Gemini API. It is designed to answer
              questions about the portfolio owner's background and projects. The assistant is constrained to
              information provided in its context and may not be fully accurate. Do not rely on its responses
              for legal, medical, financial, or professional decisions.
            </p>
          </section>

          <section className="legal__section">
            <h2>External links</h2>
            <p>
              This site contains links to external websites. {profile.name} is not responsible for the content
              or privacy practices of those external sites.
            </p>
          </section>

          <section className="legal__section">
            <h2>Limitation of liability</h2>
            <p>
              This website is provided "as is" without any warranties. {profile.name} is not liable
              for any damages arising from the use or inability to use this portfolio.
            </p>
          </section>

          <section className="legal__section">
            <h2>Changes</h2>
            <p>
              These terms may be updated from time to time. Continued use of this website constitutes
              acceptance of any changes.
            </p>
          </section>

          <section className="legal__section">
            <h2>Contact</h2>
            <p>
              For questions about these terms, contact {profile.name} at{' '}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}

