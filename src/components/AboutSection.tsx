import { useCallback } from 'react';
import { profileApi } from '../api/profileApi';
import { useFetch } from '../hooks/useFetch';
import { Section } from './Section';

export function AboutSection() {
  const fetchProfile = useCallback(() => profileApi.getProfile(), []);
  const { data: profile, isLoading, error } = useFetch(fetchProfile);

  if (isLoading) {
    return <Section id="about" title="À propos"><p className="text-muted-foreground">Chargement...</p></Section>;
  }

  if (error || !profile) {
    return <Section id="about" title="À propos"><p className="text-red-600 dark:text-red-400">Impossible de charger le profil : {error}</p></Section>;
  }

  return (
    <Section id="about" title="À propos">
      <div className="flex max-w-2xl flex-col gap-5 text-lg leading-relaxed">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
