// BACKEND DISABLED: front-only showcase site, data comes from data.ts.
// Uncomment this file to reconnect the REST API.
/*
import { useCallback, useState } from 'react';
import { skillsApi } from '../api/skillsApi';
import { useFetch } from '../hooks/useFetch';
import { SkillForm } from '../components/admin/SkillForm';
import { ProjectForm } from '../components/admin/ProjectForm';
import type { Skill } from '../types/skill';

export function AdminPage() {
  const fetchSkills = useCallback(() => skillsApi.findAll(), []);
  const { data: fetchedSkills, isLoading, error } = useFetch(fetchSkills);
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [lastCreatedProject, setLastCreatedProject] = useState<string | null>(null);

  const availableSkills = skills ?? fetchedSkills ?? [];

  return (
    <div className="flex flex-col gap-12">
      <h1 className="font-display text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Administration
      </h1>

      <section>
        <h2 className="mb-7 text-2xl font-display font-bold text-neutral-900 dark:text-neutral-100">
          Nouvelle compétence
        </h2>
        <SkillForm onCreated={(skill) => setSkills([...availableSkills, skill])} />
      </section>

      <section>
        <h2 className="mb-7 text-2xl font-display font-bold text-neutral-900 dark:text-neutral-100">
          Nouveau projet
        </h2>
        {isLoading && <p className="text-neutral-500 dark:text-neutral-400">Chargement des compétences...</p>}
        {error && <p className="text-red-600 dark:text-red-400">Impossible de charger les compétences : {error}</p>}
        <ProjectForm
          availableSkills={availableSkills}
          onCreated={(project) => setLastCreatedProject(project.title)}
        />
        {lastCreatedProject && (
          <p className="mt-3 text-green-600 dark:text-green-400">Projet "{lastCreatedProject}" créé.</p>
        )}
      </section>
    </div>
  );
}
*/

// Keeps this file a valid ES module while its code is commented out.
export {};
