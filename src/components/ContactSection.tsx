import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { siteApi } from '../api/siteApi';
import { ContactForm } from './ContactForm';
import { Section } from './Section';

export function ContactSection() {
  const [contactEmail, setContactEmail] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    siteApi
      .getInfo()
      .then((info) => {
        if (!isCancelled) setContactEmail(info.contactEmail);
      })
      .catch(() => {
        // The mail button is hidden if the data cannot be loaded.
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <Section id="contact" title="Contact" subtitle="Une question, une proposition ? Je réponds par e-mail.">
      <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
        <div>
          <p className="text-lg">
            Le plus simple est de m'écrire directement. Si vous préférez, le formulaire ouvre votre application
            mail avec le message prêt à envoyer.
          </p>
          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/85"
            >
              <Mail aria-hidden="true" className="size-4" />
              {contactEmail}
            </a>
          )}
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
