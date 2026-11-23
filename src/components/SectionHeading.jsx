import { motion, useReducedMotion } from 'framer-motion';

export default function SectionHeading({ headingId, eyebrow, title, description, align = 'left' }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`section-heading section-heading--${align}`}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={headingId}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </motion.div>
  );
}
