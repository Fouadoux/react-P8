import { Link } from 'react-router-dom';
import { buttonVariants } from '../components/ui/button';
import { cn } from '@/lib/utils';

interface NotFoundPageProps {
  title?: string;
  description?: string;
}

// Shown for any URL that matches no route, and for projects that do not exist.
// The oversized "404" is the memorable element, like the name in the Hero.
export function NotFoundPage({
  title = 'Page introuvable',
  description = "La page que vous cherchez n'existe pas ou a été déplacée.",
}: NotFoundPageProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <p
        aria-hidden="true"
        className="font-display text-[clamp(7rem,28vw,17rem)] font-extrabold leading-[0.8] text-primary"
      >
        404
      </p>

      <div className="flex max-w-xl flex-col items-center gap-3 border-t border-border pt-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className={cn(buttonVariants({ size: 'cta' }))}>
          Retour à l'accueil
        </Link>
        <Link to="/#projects" className={cn(buttonVariants({ variant: 'brandOutline', size: 'cta' }))}>
          Voir les projets
        </Link>
      </div>
    </section>
  );
}
