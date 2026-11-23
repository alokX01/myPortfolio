import { BriefcaseBusiness, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData as data } from '../data/portfolioData.js';
import SectionHeading from './SectionHeading.jsx';

export default function Experience() {
  const section = data.experience;
  const reduceMotion = useReducedMotion();
  return (
    <section className="section-wrap section-muted" id={section.id} aria-labelledby="experience-title">
      <div className="page-container">
        <SectionHeading headingId={`${section.id}-title`} eyebrow={section.eyebrow} title={section.title} />
        <div className="timeline">
          {section.entries.map((entry) => <motion.article className="timeline-entry" key={`${entry.company}-${entry.role}`} initial={reduceMotion ? false : { opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
            <div className="timeline-marker"><BriefcaseBusiness size={16} aria-hidden="true" /></div>
            <div className="timeline-card">
              <div className="timeline-header"><div><h3>{entry.role}</h3><p className="timeline-company">{entry.company} <span>·</span> <span className="timeline-location"><MapPin size={13} aria-hidden="true" />{entry.location}</span></p></div><span className="date-pill">{entry.period}</span></div>
              <ul className="detail-list">{entry.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </div>
          </motion.article>)}
        </div>
      </div>
    </section>
  );
}
