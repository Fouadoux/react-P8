import { CONTACT_EMAIL, GITHUB_URL, profile } from '../data';

const FOOTER_LINK_CLASS = 'underline underline-offset-4 transition-colors hover:text-primary';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-8 text-sm text-muted-foreground">
        <p>Fouad Benhadda, {new Date().getFullYear()}</p>
        <p className="flex gap-6">
          <a href={`mailto:${CONTACT_EMAIL}`} className={FOOTER_LINK_CLASS}>
            {CONTACT_EMAIL}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={FOOTER_LINK_CLASS}>
            GitHub
          </a>
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className={FOOTER_LINK_CLASS}>
              LinkedIn
            </a>
          )}
        </p>
      </div>
    </footer>
  );
}
