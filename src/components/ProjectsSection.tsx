import { useCallback } from 'react';
import { projectsApi } from '../api/projectsApi';
import { useFetch } from '../hooks/useFetch';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';

export function ProjectsSection() {
  const fetchProjects = useCallback(() => projectsApi.findAll(), []);
  const { data: projects, isLoading, error } = useFetch(fetchProjects);

  return (
    <Section id="projects" title="Projets" subtitle="Du back-end Java au front-end React, avec le code et les résultats.">
      {isLoading && <p className="text-muted-foreground">Chargement des projets...</p>}
      {error && <p className="text-red-600 dark:text-red-400">Impossible de charger les projets : {error}</p>}
      {projects && projects.length === 0 && <p className="text-muted-foreground">Aucun projet pour le moment.</p>}
      <ul className="flex flex-col gap-20">
        {projects?.map((project) => (
          <li key={project.id} className="group">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
