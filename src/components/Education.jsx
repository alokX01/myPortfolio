import { GraduationCap, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData as data } from '../data/portfolioData.js';
import SectionHeading from './SectionHeading.jsx';

export default function Education() {
  const section = data.education;
  const reduceMotion = useReducedMotion();
  return (
    <section className="section-wrap section-muted" id={section.id} aria-labelledby="education-title">
      <div className="page-container">
        <SectionHeading headingId={`${section.id}-title`} eyebrow={section.eyebrow} title={section.title} />
        <div className="education-list">{section.entries.map((entry) => <motion.article className="education-card" key={entry.school} initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <span className="education-icon"><GraduationCap size={22} aria-hidden="true" /></span>
          <div className="education-copy"><h3>{entry.school}</h3><p>{entry.degree}</p><span className="education-location"><MapPin size={13} aria-hidden="true" />{entry.location}</span></div>
          <span className="date-pill">{entry.period}</span>
        </motion.article>)}</div>
      </div>
    </section>
  );
}
