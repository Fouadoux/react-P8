import { useCallback } from 'react';
import { Download, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { profileApi } from '../api/profileApi';
import { siteApi } from '../api/siteApi';
import { useFetch } from '@/hooks/useFetch.ts';
import { Link } from 'react-router-dom';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

const ICON_LINK_CLASS =
    'inline-flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary';

export function Hero() {

    const fetchProfileAndSiteInfo = useCallback(() => Promise.all([profileApi.getProfile(), siteApi.getInfo()]), []);
    const { data, isLoading, error } = useFetch(fetchProfileAndSiteInfo);

    if (isLoading) {
        return (
            <section className="grid items-center gap-12 pb-6 pt-8 md:grid-cols-[1fr_auto] md:pt-16">
                <div className="animate-pulse">
                    <div className="h-12 bg-muted rounded w-3/4"/>
                    <div className="mt-8 h-8 bg-muted rounded w-1/2"/>
                </div>
                <div className="relative mx-auto size-60 sm:size-72 md:mx-0">
                    <div className="size-full overflow-hidden rounded-full border-[6px] border-primary bg-secondary"/>
                </div>
            </section>
        );
    }

    if (error || !data ) {
        return (
            <section className="grid items-center gap-12 pb-6 pt-8 md:grid-cols-[1fr_auto] md:pt-16">
                <div>
                    <p className="text-red-600 dark:text-red-400">Erreur de chargement du profil : {error}</p>
                </div>
            </section>
        );
    }
    const [profile, siteInfo] = data;
    const {photoUrl, linkedinUrl, cvUrl, availability} = profile;
    const {contactEmail, githubUrl} = siteInfo;

    return (
        <section className="grid items-center gap-12 pb-6 pt-8 md:grid-cols-[1fr_auto] md:pt-16">
            <div>
                {/* The name stays the memorable element: oversized, tight, and it widens once on load. */}
                <h1 className="animate-widen font-display text-[clamp(3.25rem,9vw,6.75rem)] font-extrabold leading-[0.9]">
                    Fouad
                    <br/>
                    Benhadda
                </h1>
                <p className="mt-8 max-w-xl text-xl leading-snug sm:text-2xl">
                    Développeur full stack. Je conçois des API en Java et Spring Boot, et des interfaces en React et
                    TypeScript.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Link
                        to="/#contact"
                        className={cn(buttonVariants({ size: 'cta' }))}
                    >
                        Écrire un message
                    </Link>
                    <Link
                        to="/#projects"
                        className="font-medium underline decoration-2 underline-offset-4 transition-colors hover:text-primary"
                    >
                        Voir les projets
                    </Link>
                    {cvUrl && (
                        <a
                            href={cvUrl}
                            download
                            className="inline-flex items-center gap-2 font-medium underline decoration-2 underline-offset-4 transition-colors hover:text-primary"
                        >
                            <Download aria-hidden="true" className="size-4"/>
                            Mon CV
                        </a>
                    )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"
                       className={ICON_LINK_CLASS}>
                        <FaGithub aria-hidden="true" className="size-5"/>
                    </a>
                    {linkedinUrl && (
                        <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                           className={ICON_LINK_CLASS}>
                            <FaLinkedinIn aria-hidden="true" className="size-5"/>
                        </a>
                    )}
                    <a href={`mailto:${contactEmail}`} aria-label="Envoyer un e-mail" className={ICON_LINK_CLASS}>
                        <Mail aria-hidden="true" className="size-5"/>
                    </a>
                    {availability && (
                        <p className="ml-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <span aria-hidden="true" className="size-2 rounded-full bg-green-500"/>
                            {availability}
                        </p>
                    )}
                </div>
            </div>

            {/* Portrait: a photo when profile.photoUrl is set, the initials until then. */}
            <div className="relative mx-auto size-60 sm:size-72 md:mx-0">
                <div className="size-full overflow-hidden rounded-full border-[6px] border-primary bg-secondary">
                    {photoUrl ? (
                        <img src={photoUrl} alt="Portrait de Fouad Benhadda" className="size-full object-cover"/>
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
