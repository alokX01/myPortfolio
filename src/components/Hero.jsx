import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { AtSign } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData as data } from '../data/portfolioData.js';

const socialIcons = { github: FaGithub, linkedin: FaLinkedinIn, mail: AtSign };

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [typedTitle, setTypedTitle] = useState(data.hero.rotatingTitles[0]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const titles = data.hero.rotatingTitles;
    let titleIndex = 0;
    let characterCount = titles[0].length;
    let deleting = true;
    let timer;

    const typeNextCharacter = () => {
      const title = titles[titleIndex];
      characterCount += deleting ? -1 : 1;
      setTypedTitle(title.slice(0, characterCount));

      if (deleting && characterCount === 0) {
        titleIndex = (titleIndex + 1) % titles.length;
        deleting = false;
        timer = window.setTimeout(typeNextCharacter, 350);
      } else if (!deleting && characterCount === title.length) {
        deleting = true;
        timer = window.setTimeout(typeNextCharacter, 1300);
      } else {
        timer = window.setTimeout(typeNextCharacter, deleting ? 42 : 78);
      }
    };

    timer = window.setTimeout(typeNextCharacter, 1300);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
      <div className="hero-grid page-container">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="hero-eyebrow"><span className="status-dot" />{data.hero.eyebrow}</p>
          <h1 id="hero-title">{data.hero.greeting} <span className="accent-text">{data.hero.name}</span><span className="hero-period">.</span></h1>
          <p className="hero-title">{data.hero.title}</p>
          <div className="hero-role-line">
            <span className="hero-role-prefix">{data.hero.typingPrefix}</span>
            <span className="typing-text" aria-live="off">{typedTitle}</span>
          </div>
          <p className="hero-summary">{data.hero.summary}</p>
          <div className="hero-location"><MapPin size={16} aria-hidden="true" /> <span>{data.hero.location}</span></div>
          <div className="hero-buttons">
            {data.hero.buttons.map((button) => (
              <a key={button.label} href={button.href} className={`button button--${button.style}`} download={button.download || undefined}>
                {button.label}
                {button.style === 'primary' ? <ArrowDownRight size={17} aria-hidden="true" /> : button.style === 'secondary' ? <ArrowUpRight size={16} aria-hidden="true" /> : null}
              </a>
            ))}
          </div>
          <div className="hero-socials" aria-label={data.hero.socialLabel}>
            {data.hero.socialLinks.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a key={social.label} href={social.href} aria-label={social.label} title={social.label} target={social.href.startsWith('http') ? '_blank' : undefined} rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <Icon size={18} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.aside
          className="hero-visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
          aria-label={`${data.hero.cardTitle}. ${data.hero.cardDescription}`}
        >
          <div className="hero-visual-top"><span className="hero-visual-label">{data.hero.cardLabel}</span><span className="visual-dots"><i /><i /><i /></span></div>
          <div className="hero-visual-center">
            <div className="code-orbit code-orbit--outer" />
            <div className="code-orbit code-orbit--inner" />
            <div className="code-symbol hero-photo-symbol">
              <img src={data.hero.photo.src} alt={data.hero.photo.alt} width="84" height="84" />
            </div>
            <span className="orbit-chip orbit-chip--one">JS</span>
            <span className="orbit-chip orbit-chip--two">&lt;/&gt;</span>
            <span className="orbit-chip orbit-chip--three">{ }</span>
          </div>
          <div className="hero-visual-caption">
            <div><h2>{data.hero.cardTitle}</h2><p>{data.hero.cardDescription}</p></div>
            <span className="visual-arrow"><ArrowUpRight size={18} aria-hidden="true" /></span>
          </div>
          <div className="hero-code-card" aria-label={data.hero.codeLabel}>
            <div className="code-card-title"><span className="code-file-dot" />{data.hero.codeLabel}</div>
            <pre>{data.hero.codeLines.map((line) => <code key={line.key}><span className="code-key">{line.key}</span>: <span className="code-value">'{line.value}'</span>{line.key !== data.hero.codeLines[data.hero.codeLines.length - 1].key ? ',' : ''}{'\n'}</code>)}</pre>
          </div>
        </motion.aside>
        <a className="hero-scroll-hint" href="#about"><span />Scroll to explore</a>
      </div>
    </section>
  );
}
