import { useCallback } from 'react';
import { Mail } from 'lucide-react';
import { siteApi } from '../api/siteApi';
import { ContactForm } from './ContactForm';
import { Section } from './Section';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { useFetch } from '@/hooks/useFetch.ts';

export function ContactSection() {

  const fetchSiteInfo = useCallback(() => siteApi.getInfo(), []);
  const { data: siteInfo } = useFetch(fetchSiteInfo);

  return (
    <Section id="contact" title="Contact" subtitle="Une question, une proposition ? Je réponds par e-mail.">
      <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
        <div>
          <p className="text-lg">
            Le plus simple est de m'écrire directement. Si vous préférez, le formulaire ouvre votre application
            mail avec le message prêt à envoyer.
          </p>
          {siteInfo?.contactEmail && (
            <a
              href={`mailto:${siteInfo.contactEmail}`}
              className={cn(buttonVariants({ size: 'cta' }), 'mt-6')}
            >
              <Mail aria-hidden="true" className="size-4" />
              {siteInfo.contactEmail}
            </a>
          )}
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
