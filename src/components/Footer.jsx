import { ArrowUp, AtSign } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { portfolioData as data } from '../data/portfolioData.js';

const iconMap = { github: FaGithub, linkedin: FaLinkedinIn, mail: AtSign };

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <a className="footer-brand" href="#top" aria-label={data.footer.backToTop}>{data.navigation.brand}<span>.</span></a>
        <p>{data.footer.line}</p>
        <div className="footer-right">
          <div className="footer-socials">{data.hero.socialLinks.map((social) => {
            const Icon = iconMap[social.icon];
            return <a key={social.label} href={social.href} aria-label={social.label} target={social.href.startsWith('http') ? '_blank' : undefined} rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}><Icon size={16} aria-hidden="true" /></a>;
          })}</div>
          <a href="#top" className="back-to-top">{data.footer.backToTop}<ArrowUp size={15} aria-hidden="true" /></a>
        </div>
        <span className="footer-copyright">{data.footer.copyright.replace('{year}', year)}</span>
      </div>
    </footer>
  );
}
