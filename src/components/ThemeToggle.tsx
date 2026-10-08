import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Reads the theme actually applied by the script in index.html (saved choice or system).
const readIsDark = (): boolean => document.documentElement.classList.contains('dark');

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(readIsDark);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // Storage can be blocked (private mode): the choice then only lasts for this visit.
    }
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
      className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {isDark ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
    </button>
  );
}
