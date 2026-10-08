// BACKEND DISABLED: front-only showcase site, data comes from data.ts.
// Uncomment this file to reconnect the REST API.
/*
import { useState } from 'react';
import type { FormEvent } from 'react';
import clsx from 'clsx';
import { projectsApi } from '../../api/projectsApi';
import { ApiError } from '../../api/httpClient';
import type { Project } from '../../types/project';
import { getCategoryBadgeClasses, getCategorySolidClasses } from '../../types/skill';
import type { Skill } from '../../types/skill';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface ProjectFormProps {
  availableSkills: Skill[];
  onCreated: (project: Project) => void;
}

export function ProjectForm({ availableSkills, onCreated }: ProjectFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const project = await projectsApi.create({
        title,
        description,
        imageUrl: imageUrl || null,
        content: content || null,
        repoUrl: repoUrl || null,
        demoUrl: demoUrl || null,
        skillIds: selectedSkillIds,
      });
      onCreated(project);
      setTitle('');
      setDescription('');
      setImageUrl('');
      setContent('');
      setRepoUrl('');
      setDemoUrl('');
      setSelectedSkillIds([]);
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex max-w-md flex-col gap-2" onSubmit={handleSubmit}>
      <Label htmlFor="project-title" className="mt-2">
        Titre
      </Label>
      <Input
        id="project-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        disabled={isSubmitting}
      />

      <Label htmlFor="project-description" className="mt-2">
        Résumé (affiché sur le panneau)
      </Label>
      <Textarea
        id="project-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
        disabled={isSubmitting}
      />

      <Label htmlFor="project-image" className="mt-2">
        URL de l'image
      </Label>
      <Input
        id="project-image"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
        disabled={isSubmitting}
      />

      <Label htmlFor="project-content" className="mt-2">
        Présentation complète (page de détail)
      </Label>
      <Textarea
        id="project-content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={6}
        disabled={isSubmitting}
      />

      <Label htmlFor="project-repo" className="mt-2">
        Lien du code
      </Label>
      <Input
        id="project-repo"
        value={repoUrl}
        onChange={(event) => setRepoUrl(event.target.value)}
        disabled={isSubmitting}
      />

      <Label htmlFor="project-demo" className="mt-2">
        Lien de la démo
      </Label>
      <Input
        id="project-demo"
        value={demoUrl}
        onChange={(event) => setDemoUrl(event.target.value)}
        disabled={isSubmitting}
      />

      <Label className="mt-2">Compétences</Label>
      <div className="flex flex-wrap gap-2">
        {availableSkills.map((skill) => {
          const isSelected = selectedSkillIds.includes(skill.id);
          return (
            <button
              key={skill.id}
              type="button"
              className={clsx(
                'rounded-full px-3 py-1 text-sm font-medium transition',
                isSelected ? getCategorySolidClasses(skill.category) : getCategoryBadgeClasses(skill.category)
              )}
              aria-pressed={isSelected}
              disabled={isSubmitting}
              title={skill.category}
              onClick={() =>
                setSelectedSkillIds(
                  isSelected
                    ? selectedSkillIds.filter((id) => id !== skill.id)
                    : [...selectedSkillIds, skill.id]
                )
              }
            >
              {skill.name}
            </button>
          );
        })}
        {availableSkills.length === 0 && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Aucune compétence pour le moment.</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="mt-3 self-start rounded-full px-7">
        {isSubmitting ? 'Création...' : 'Créer le projet'}
      </Button>

      {errorMessage && <p className="text-red-600 dark:text-red-400">{errorMessage}</p>}
    </form>
  );
}
*/

// Keeps this file a valid ES module while its code is commented out.
export {};
