import { Code2, PanelsTopLeft, Server, Database, ShieldCheck, Wrench, Cpu, Palette } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData as data } from '../data/portfolioData.js';
import SectionHeading from './SectionHeading.jsx';

const icons = { code: Code2, panels: PanelsTopLeft, server: Server, database: Database, shield: ShieldCheck, wrench: Wrench, cpu: Cpu };

export default function Skills() {
  const section = data.skills;
  const reduceMotion = useReducedMotion();
  return (
    <section className="section-wrap" id={section.id} aria-labelledby="skills-title">
      <div className="page-container">
        <SectionHeading headingId={`${section.id}-title`} eyebrow={section.eyebrow} title={section.title} description={section.description} />
        <div className="skills-grid">
          {section.groups.map((group, index) => {
            const Icon = icons[group.icon];
            return <motion.article className="skill-card" key={group.title} initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.35, delay: reduceMotion ? 0 : (index % 3) * 0.06 }}>
              <div className="skill-card-heading"><span className="skill-icon"><Icon size={18} aria-hidden="true" /></span><h3>{group.title}</h3></div>
              <ul className="badge-list">{group.items.map((item) => <li className="skill-badge" key={item}>{item}</li>)}</ul>
            </motion.article>;
          })}
        </div>
        <article className="design-skills-card">
          <div className="design-copy"><span className="skill-icon"><Palette size={19} aria-hidden="true" /></span><div><h3>{section.design.title}</h3><p>{section.design.description}</p></div></div>
          <ul className="badge-list">{section.design.items.map((item) => <li className="skill-badge skill-badge--light" key={item}>{item}</li>)}</ul>
        </article>
      </div>
    </section>
  );
}
