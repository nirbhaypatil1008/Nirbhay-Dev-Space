import { Helmet } from 'react-helmet-async';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Education from '../sections/Education';
import Contact from '../sections/Contact';
import { profile } from '../data/profile';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{profile.name} — {profile.role}</title>
        <meta name="description" content={`Portfolio of ${profile.name}, ${profile.role} based in ${profile.location}. ${profile.tagline}`} />
        <meta property="og:title" content={`${profile.name} — ${profile.role}`} />
        <meta property="og:description" content={profile.about.slice(0, 160)} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${profile.name} — ${profile.role}`} />
        <meta name="twitter:description" content={profile.about.slice(0, 160)} />
        <link rel="canonical" href="/" />
      </Helmet>
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}

