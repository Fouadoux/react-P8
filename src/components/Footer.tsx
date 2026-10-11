import { useEffect, useState } from 'react';
import { profileApi } from '../api/profileApi';
import { siteApi } from '../api/siteApi';

const FOOTER_LINK_CLASS = 'underline underline-offset-4 transition-colors hover:text-primary';

export function Footer() {
  const [contactEmail, setContactEmail] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    // Both calls share the same data.json request.
    Promise.all([siteApi.getInfo(), profileApi.getProfile()])
      .then(([info, profile]) => {
        if (isCancelled) return;
        setContactEmail(info.contactEmail);
        setGithubUrl(info.githubUrl);
        setLinkedinUrl(profile.linkedinUrl);
      })
      .catch(() => {
        // The footer degrades gracefully: links are simply not rendered.
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-8 text-sm text-muted-foreground">
        <p>Fouad Benhadda, {new Date().getFullYear()}</p>
        <p className="flex gap-6">
          {contactEmail && (
            <a href={`mailto:${contactEmail}`} className={FOOTER_LINK_CLASS}>
              {contactEmail}
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noreferrer" className={FOOTER_LINK_CLASS}>
              GitHub
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className={FOOTER_LINK_CLASS}>
              LinkedIn
            </a>
          )}
        </p>
      </div>
    </footer>
  );
}
