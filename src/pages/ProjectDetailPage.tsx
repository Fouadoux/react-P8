import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectsApi } from '../api/projectsApi';
import { useFetch } from '../hooks/useFetch';
import { ImageCarousel } from '../components/ImageCarousel';
import { SkillBadge } from '../components/SkillBadge';
import { buttonVariants } from '../components/ui/button';
import { cn } from '@/lib/utils';
import { NotFoundPage } from './NotFoundPage';

const TEXT_LINK_CLASS =
  'font-medium underline decoration-2 underline-offset-4 transition-colors hover:text-primary';

// Text blocks share one measure so the page has a single, readable column;
// only the media (carousel) is allowed to be wider.
const TEXT_COLUMN_CLASS = 'max-w-2xl';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  const fetchProject = useCallback(() => projectsApi.findById(projectId), [projectId]);
  const { data: project, isLoading, error } = useFetch(fetchProject);
  const fetchProjects = useCallback(() => projectsApi.findAll(), []);
  const { data: allProjects } = useFetch(fetchProjects);

  if (isLoading) {
    return <p className="text-neutral-500 dark:text-neutral-400">Chargement du projet...</p>;
  }

  // A loading failure (network, bad JSON) is not a 404: the project may well exist.
  if (error) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-red-600 dark:text-red-400">Impossible de charger le projet : {error}</p>
        <Link to="/" className={TEXT_LINK_CLASS}>
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  // Loaded fine, but no project has this id (unknown or non-numeric id in the URL).
  if (!project) {
    return (
      <NotFoundPage
        title="Projet introuvable"
        description="Ce projet n'existe pas ou n'est plus disponible."
      />
    );
  }

  const { gallery = [], highlights = [] } = project;
  // Wraps around, so the last project points back to the first one.
  const nextProject = allProjects
    ? allProjects[(allProjects.findIndex(({ id }) => id === project.id) + 1) % allProjects.length]
    : undefined;

  return (
    <article className="flex max-w-4xl flex-col gap-8">
      <Link to="/" className="self-start text-sm text-muted-foreground transition-colors hover:text-foreground">
        Retour aux projets
      </Link>

      <header>
        <p className="text-sm text-muted-foreground">{new Date(project.createdAt).getFullYear()}</p>
        <h1 className="mt-2 font-display text-5xl font-extrabold leading-none sm:text-7xl">{project.title}</h1>
      </header>

      {/* Links come first: seeing the live site or the code is what a visitor most likely wants. */}
      {(project.demoUrl || project.repoUrl) && (
        <div className="flex flex-wrap gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: 'cta' }))}
            >
              Voir la démo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: project.demoUrl ? 'brandOutline' : 'default', size: 'cta' }))}
            >
              Voir le code
            </a>
          )}
        </div>
      )}

      {project.imageUrl && (
        <img className="max-h-[420px] w-full rounded object-cover" src={project.imageUrl} alt={project.title} />
      )}

      {gallery.length > 0 && <ImageCarousel images={gallery} label={`Captures d'écran de ${project.title}`} />}

      <p className={`${TEXT_COLUMN_CLASS} whitespace-pre-wrap text-lg leading-relaxed`}>
        {project.content ?? project.description}
      </p>

      {highlights.length > 0 && (
        <section className={TEXT_COLUMN_CLASS}>
          <h2 className="font-display text-2xl font-semibold">Points techniques</h2>
          <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 marker:text-primary">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex max-w-2xl flex-wrap gap-x-7 gap-y-3 border-t border-border pt-6">
        {project.skills.map((skill) => (
          <SkillBadge key={skill.id} skill={skill} />
        ))}
      </div>

      {nextProject && nextProject.id !== project.id && (
        <Link
          to={`/projects/${nextProject.id}`}
          className="group mt-8 border-t border-border pt-8"
        >
          <span className="text-sm text-muted-foreground">Projet suivant</span>
          <span className="mt-1 block font-display text-3xl font-semibold transition-colors group-hover:text-primary sm:text-4xl">
            {nextProject.title}
          </span>
        </Link>
      )}
    </article>
  );
}
