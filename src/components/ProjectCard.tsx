import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../types/project';
import { SkillBadge } from './SkillBadge';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

// A project presented like a case study: a visual on one side, the story on the other.
// Rows alternate sides: the parent <li> carries the `group` class, so `group-even:` sees its position in the list.
export function ProjectCard({ project }: ProjectCardProps) {
  const cover = project.gallery?.[0];
  const year = new Date(project.createdAt).getFullYear();
  const detailPath = `/projects/${project.id}`;

  return (
    <article className="grid items-center gap-x-12 gap-y-6 md:grid-cols-2">
      <Link
        to={detailPath}
        aria-label={`Voir le projet ${project.title}`}
        className="overflow-hidden rounded border border-border bg-muted md:group-even:order-2"
      >
        {cover ? (
          <img
            src={cover.src}
            alt=""
            loading="lazy"
            className="aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          // No screenshot yet: show the stack large, on a tinted panel.
          <div className="grid aspect-video grid-cols-3 content-center items-center justify-items-center gap-y-8 p-8">
            {project.skills.slice(0, 6).map(({ id, icon: Icon, iconColor, name }) =>
              Icon ? <Icon key={id} aria-hidden="true" className="size-12" color={iconColor} title={name} /> : null,
            )}
          </div>
        )}
      </Link>

      <div>
        <p className="text-sm text-muted-foreground">{year}</p>
        <h3 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
          <Link to={detailPath} className="transition-colors hover:text-primary">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-lg text-muted-foreground">{project.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          {project.skills.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} iconOnly />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to={detailPath} className={cn(buttonVariants({ size: 'card' }))}>
            Voir le projet
          </Link>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'brandOutline', size: 'card' }))}
            >
              Démo
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'brandOutline', size: 'card' }))}
            >
              Code
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
