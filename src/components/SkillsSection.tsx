import { useCallback } from 'react';
import { skillsApi } from '../api/skillsApi';
import { useFetch } from '../hooks/useFetch';
import { Section } from './Section';
import { SkillBadge } from './SkillBadge';
import { SKILL_CATEGORIES } from '../types/skill';

export function SkillsSection() {
  const fetchSkills = useCallback(() => skillsApi.findAll(), []);
  const { data: skills, isLoading, error } = useFetch(fetchSkills);

  return (
    <Section id="skills" title="Compétences" subtitle="Les outils que j'utilise au quotidien, rangés par domaine.">
      {isLoading && <p className="text-muted-foreground">Chargement des compétences...</p>}
      {error && <p className="text-red-600 dark:text-red-400">Impossible de charger les compétences : {error}</p>}
      {/* One block per category: the grouping tells a recruiter at a glance where the strengths are. */}
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((category) => {
          const categorySkills = skills?.filter((skill) => skill.category === category);
          if (!categorySkills || categorySkills.length === 0) return null;
          return (
            <div key={category} className="border-t border-border pt-4">
              <h3 className="font-display text-lg font-semibold">{category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <SkillBadge key={skill.id} skill={skill} chip />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
