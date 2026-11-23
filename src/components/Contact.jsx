import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, ArrowUpRight, Send } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { portfolioData as data } from '../data/portfolioData.js';
import SectionHeading from './SectionHeading.jsx';

const icons = { mail: Mail, phone: Phone, map: MapPin, linkedin: FaLinkedinIn, github: FaGithub };

export default function Contact() {
  const section = data.contact;
  const form = section.form;
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formRef.current?.reportValidity()) {
      setStatus({ type: 'error', message: form.requiredMessage });
      return;
    }

    const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env;
    const hasEmailJsConfig = [VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY]
      .every((value) => value && !value.startsWith('your_'));

    if (!hasEmailJsConfig) {
      const fields = new FormData(formRef.current);
      const subject = encodeURIComponent(`Portfolio message from ${fields.get('from_name')}`);
      const body = encodeURIComponent(`Name: ${fields.get('from_name')}\nEmail: ${fields.get('reply_to')}\n\n${fields.get('message')}`);
      setStatus({ type: 'fallback', message: form.fallbackMessage });
      window.location.href = `mailto:${section.details[0].value}?subject=${subject}&body=${body}`;
      return;
    }

    setSending(true);
    setStatus({ type: '', message: '' });
    try {
      await emailjs.sendForm(VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: VITE_EMAILJS_PUBLIC_KEY });
      formRef.current.reset();
      setStatus({ type: 'success', message: form.successMessage });
    } catch {
      setStatus({ type: 'error', message: form.errorMessage });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section-wrap section-muted" id={section.id} aria-labelledby="contact-title">
      <div className="page-container">
        <SectionHeading headingId={`${section.id}-title`} eyebrow={section.eyebrow} title={section.title} description={section.description} />
        <div className="contact-layout">
          <div className="contact-details">
            {section.details.map((detail) => {
              const Icon = icons[detail.icon];
              const content = <><span className="contact-detail-icon"><Icon size={17} aria-hidden="true" /></span><span><span className="contact-detail-label">{detail.label}</span><span className="contact-detail-value">{detail.value}</span></span>{detail.href.startsWith('http') && <ArrowUpRight className="contact-detail-arrow" size={15} aria-hidden="true" />}</>;
              return detail.href ? <a className="contact-detail" key={detail.label} href={detail.href} target={detail.href.startsWith('http') ? '_blank' : undefined} rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{content}</a> : <div className="contact-detail" key={detail.label}>{content}</div>;
            })}
          </div>
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
            <h3>{form.title}</h3>
            <label htmlFor="contact-name">{form.nameLabel}</label>
            <input id="contact-name" name="from_name" type="text" placeholder={form.namePlaceholder} autoComplete="name" required minLength={2} />
            <label htmlFor="contact-email">{form.emailLabel}</label>
            <input id="contact-email" name="reply_to" type="email" placeholder={form.emailPlaceholder} autoComplete="email" required />
            <label htmlFor="contact-message">{form.messageLabel}</label>
            <textarea id="contact-message" name="message" rows="4" placeholder={form.messagePlaceholder} required minLength={10} />
            {status.message && <p className={`form-status form-status--${status.type}`} role="status">{status.message}{status.type === 'fallback' && <a href={`mailto:${section.details[0].value}`} className="fallback-link">{form.fallbackLabel}</a>}</p>}
            <button className="button button--form" type="submit" disabled={sending}>
              {sending ? form.sendingLabel : form.buttonLabel}<Send size={16} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
