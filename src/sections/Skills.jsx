import { useScrollReveal } from '../hooks/useScrollReveal';
import { skills } from '../data/profile';
import {
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiPostman,
} from 'react-icons/si';
import { TbDatabase, TbApi } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import './Skills.css';

const skillIconMap = {
  JavaScript: SiJavascript,
  SQL: TbDatabase,
  Python: SiPython,
  HTML: SiHtml5,
  CSS: SiCss,
  React: SiReact,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'REST APIs': TbApi,
  'JWT Authentication': SiJsonwebtokens,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Git: SiGit,
  GitHub: SiGithub,
  'VS Code': VscVscode,
  Postman: SiPostman,
};

export default function Skills() {
  const headerRef = useScrollReveal();

  return (
    <section id="skills" className="section section-alt skills">
      <div className="container">
        <div ref={headerRef} className="skills__header">
          <p className="section-label">TECHNICAL SKILLS</p>
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="section-desc">
            A focused collection of technologies and tools I use to build practical software applications, from frontend interfaces to backend services and databases.
          </p>
        </div>

        <div className="skills__grid">
          {skills.map(({ category, items }, catIdx) => (
            <SkillCard key={category} category={category} items={items} index={catIdx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category, items, index }) {
  const ref = useScrollReveal({ threshold: 0.1 });

  return (
    <article
      ref={ref}
      className="skills__card"
      style={{ '--card-delay': `${index * 80}ms` }}
      aria-label={`${category} skills`}
    >
      <div className="skills__card-header">
        <h3 className="skills__card-title">{category}</h3>
        <span className="skills__card-count" aria-hidden="true">
          {items.length} {items.length === 1 ? 'skill' : 'skills'}
        </span>
      </div>
      <div className="skills__pills" role="list">
        {items.map((item) => {
          const Icon = skillIconMap[item];
          return (
            <span key={item} className="skills__pill" role="listitem">
              {Icon && <Icon className="skills__pill-icon" aria-hidden="true" />}
              <span className="skills__pill-text">{item}</span>
            </span>
          );
        })}
      </div>
    </article>
  );
}

