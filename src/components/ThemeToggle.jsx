import { Moon, Sun } from 'lucide-react';
import { portfolioData as data } from '../data/portfolioData.js';

export default function ThemeToggle({ theme, onChange }) {
  const isDark = theme === 'dark';
  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      onClick={() => onChange(isDark ? 'light' : 'dark')}
      aria-label={isDark ? data.theme.switchToLight : data.theme.switchToDark}
      title={isDark ? data.theme.switchToLight : data.theme.switchToDark}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
