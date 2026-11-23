import { useEffect, useState } from 'react';
import { portfolioData as data } from './data/portfolioData.js';
import About from './components/About.jsx';
import Certifications from './components/Certifications.jsx';
import Contact from './components/Contact.jsx';
import Education from './components/Education.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(data.meta.themeStorageKey) === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem(data.meta.themeStorageKey, theme);
    } catch {
      // The selected theme still works for this visit if storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    document.title = data.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', data.meta.description);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">{data.navigation.skipLabel}</a>
      <Navbar theme={theme} onThemeChange={setTheme} />
      <main id="main" className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
