import { useEffect, useState } from 'react';
import { Download, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { CONTACT_EMAIL, GITHUB_URL } from '../data';
import { profileApi } from '../api/profileApi';
import type { Profile } from '../types/profile';

const ICON_LINK_CLASS =
  'inline-flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary';

export function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    profileApi.getProfile()
      .then((data) => {
        setProfile(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section className="grid items-center gap-12 pb-6 pt-8 md:grid-cols-[1fr_auto] md:pt-16">
        <div className="animate-pulse">
          <div className="h-12 bg-muted rounded w-3/4" />
          <div className="mt-8 h-8 bg-muted rounded w-1/2" />
        </div>
        <div className="relative mx-auto size-60 sm:size-72 md:mx-0">
          <div className="size-full overflow-hidden rounded-full border-[6px] border-primary bg-secondary" />
        </div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="grid items-center gap-12 pb-6 pt-8 md:grid-cols-[1fr_auto] md:pt-16">
        <div>
          <p className="text-red-600 dark:text-red-400">Erreur de chargement du profil : {error}</p>
        </div>
      </section>
    );
  }

  const { photoUrl, linkedinUrl, cvUrl, availability } = profile;

  return (
    <section className="grid items-center gap-12 pb-6 pt-8 md:grid-cols-[1fr_auto] md:pt-16">
      <div>
        {/* The name stays the memorable element: oversized, tight, and it widens once on load. */}
        <h1 className="animate-widen font-display text-[clamp(3.25rem,9vw,6.75rem)] font-extrabold leading-[0.9]">
          Fouad
          <br />
          Benhadda
        </h1>
        <p className="mt-8 max-w-xl text-xl leading-snug sm:text-2xl">
          Développeur full stack. Je conçois des API en Java et Spring Boot, et des interfaces en React et
          TypeScript.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="/#contact"
            className="inline-flex h-11 items-center rounded bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Écrire un message
          </a>
          <a
            href="/#projects"
            className="font-medium underline decoration-2 underline-offset-4 transition-colors hover:text-primary"
          >
            Voir les projets
          </a>
          {cvUrl && (
            <a
              href={cvUrl}
              download
              className="inline-flex items-center gap-2 font-medium underline decoration-2 underline-offset-4 transition-colors hover:text-primary"
            >
              <Download aria-hidden="true" className="size-4" />
              Mon CV
            </a>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" className={ICON_LINK_CLASS}>
            <FaGithub aria-hidden="true" className="size-5" />
          </a>
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={ICON_LINK_CLASS}>
              <FaLinkedinIn aria-hidden="true" className="size-5" />
            </a>
          )}
          <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Envoyer un e-mail" className={ICON_LINK_CLASS}>
            <Mail aria-hidden="true" className="size-5" />
          </a>
          {availability && (
            <p className="ml-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span aria-hidden="true" className="size-2 rounded-full bg-green-500" />
              {availability}
            </p>
          )}
        </div>
      </div>

      {/* Portrait: a photo when profile.photoUrl is set, the initials until then. */}
      <div className="relative mx-auto size-60 sm:size-72 md:mx-0">
        <div className="size-full overflow-hidden rounded-full border-[6px] border-primary bg-secondary">
          {photoUrl ? (
            <img src={photoUrl} alt="Portrait de Fouad Benhadda" className="size-full object-cover" />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-full items-center justify-center font-display text-7xl font-extrabold text-primary"
            >
              FB
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
