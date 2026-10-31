import { motion } from 'framer-motion';
import { skills } from '../data/profile';
import { InView, AnimatedGroup } from '../components/motion';
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
import {
  TbDatabase,
  TbApi,
  TbChartBar,
  TbFilter,
  TbChartPie,
  TbReportAnalytics,
  TbMathFunction,
  TbCpu,
} from 'react-icons/tb';
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
  'Data Analysis': TbReportAnalytics,
  'Data Cleaning': TbFilter,
  'Data Visualization': TbChartPie,
  'Data Interpretation': TbChartBar,
  'Statistical Analysis': TbMathFunction,
  'Data Processing': TbCpu,
};

/**
 * Skills section with Motion Primitives
 *   • InView: Smooth entrance for section title and overview
 *   • AnimatedGroup: Staggered reveal for skill cards
 *   • Micro-interactions: Tactile hover response on individual skill badges
 */
export default function Skills() {
  return (
    <section id="skills" className="section section-alt skills">
      <div className="container">
        <InView
          className="skills__header"
          variants={{
            hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p className="section-label">TECHNICAL SKILLS</p>
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="section-desc">
            A focused collection of technologies and tools I use to build practical software applications, from frontend interfaces to backend services and databases.
          </p>
        </InView>

        <AnimatedGroup className="skills__grid" stagger={0.08}>
          {skills.map(({ category, items }, catIdx) => (
            <SkillCard key={category} category={category} items={items} index={catIdx} />
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

function SkillCard({ category, items, index }) {
  return (
    <motion.article
      className="skills__card"
      aria-label={`${category} skills`}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
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
            <motion.span
              key={item}
              className="skills__pill"
              role="listitem"
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              {Icon && <Icon className="skills__pill-icon" aria-hidden="true" />}
              <span className="skills__pill-text">{item}</span>
            </motion.span>
          );
        })}
      </div>
    </motion.article>
  );
}
