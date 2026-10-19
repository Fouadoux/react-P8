import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINK_CLASS = 'transition-colors hover:text-foreground';
// Secondary links are hidden on narrow screens, where the hero already offers the main actions.
const SECONDARY_LINK_CLASS = `${NAV_LINK_CLASS} hidden sm:inline`;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <Link to="/" className="whitespace-nowrap font-display text-base font-bold sm:text-lg">
          Fouad Benhadda
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground sm:gap-6">
          <Link to="/#about" className={SECONDARY_LINK_CLASS}>
            À propos
          </Link>
          <Link to="/#projects" className={SECONDARY_LINK_CLASS}>
            Projets
          </Link>
          <Link to="/#skills" className={SECONDARY_LINK_CLASS}>
            Compétences
          </Link>
          <Link to="/#contact" className={NAV_LINK_CLASS}>
            Contact
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
