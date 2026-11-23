import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData as data } from '../data/portfolioData.js';
import SectionHeading from './SectionHeading.jsx';

export default function Certifications() {
  const section = data.certifications;
  const reduceMotion = useReducedMotion();
  return (
    <section className="section-wrap" id={section.id} aria-labelledby="certifications-title">
      <div className="page-container">
        <SectionHeading headingId={`${section.id}-title`} eyebrow={section.eyebrow} title={section.title} />
        <div className="certification-grid">{section.entries.map((entry, index) => <motion.article className="certification-card" key={entry.title} initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.07 }}>
          <span className="certification-icon"><BadgeCheck size={21} aria-hidden="true" /></span>
          <div className="certification-copy"><h3>{entry.title}</h3><p>{entry.issuer}{entry.date ? ` · ${entry.date}` : ''}</p></div>
          <a className="verify-link" href={entry.href} target="_blank" rel="noopener noreferrer">{section.verifyLabel}<ArrowUpRight size={15} aria-hidden="true" /></a>
        </motion.article>)}</div>
      </div>
    </section>
  );
}
