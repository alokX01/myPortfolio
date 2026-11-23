import { BriefcaseBusiness, GraduationCap, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData as data } from '../data/portfolioData.js';
import SectionHeading from './SectionHeading.jsx';

const icons = { graduation: GraduationCap, map: MapPin, briefcase: BriefcaseBusiness };

export default function About() {
  const section = data.about;
  const reduceMotion = useReducedMotion();
  return (
    <section className="section-wrap section-muted" id={section.id} aria-labelledby="about-title">
      <div className="page-container about-layout">
        <div>
          <SectionHeading headingId={`${section.id}-title`} eyebrow={section.eyebrow} title={section.title} />
          <motion.p className="about-body" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}>
            {section.body}
          </motion.p>
        </div>
        <div className="about-info-panel">
          <p className="eyebrow">{section.quickInfoLabel}</p>
          <div className="quick-info-list">
            {section.quickInfo.map((item) => {
              const Icon = icons[item.icon];
              return <article className="quick-info-card" key={item.label}>
                <span className="quick-info-icon"><Icon size={19} aria-hidden="true" /></span>
                <div><h3>{item.label}</h3><p>{item.detail}</p></div>
              </article>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
