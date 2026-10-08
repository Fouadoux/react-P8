// BACKEND DISABLED: front-only showcase site, data comes from data.ts.
// Uncomment this file to reconnect the REST API.
/*
import { useState } from 'react';
import type { FormEvent } from 'react';
import { skillsApi } from '../../api/skillsApi';
import { ApiError } from '../../api/httpClient';
import { SKILL_CATEGORIES } from '../../types/skill';
import type { Skill } from '../../types/skill';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SkillFormProps {
  onCreated: (skill: Skill) => void;
}

export function SkillForm({ onCreated }: SkillFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>(SKILL_CATEGORIES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const skill = await skillsApi.create({ name, category });
      onCreated(skill);
      setName('');
      setCategory(SKILL_CATEGORIES[0]);
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex max-w-md flex-col gap-2" onSubmit={handleSubmit}>
      <Label htmlFor="skill-name" className="mt-2">
        Nom
      </Label>
      <Input
        id="skill-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        disabled={isSubmitting}
      />

      <Label htmlFor="skill-category" className="mt-2">
        Catégorie
      </Label>
      <Select
        value={category}
        onValueChange={(value) => setCategory(value ?? SKILL_CATEGORIES[0])}
        disabled={isSubmitting}
      >
        <SelectTrigger id="skill-category" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SKILL_CATEGORIES.map((skillCategory) => (
            <SelectItem key={skillCategory} value={skillCategory}>
              {skillCategory}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit" disabled={isSubmitting} className="mt-3 self-start rounded-full px-7">
        {isSubmitting ? 'Ajout...' : 'Ajouter la compétence'}
      </Button>

      {errorMessage && <p className="text-red-600 dark:text-red-400">{errorMessage}</p>}
    </form>
  );
}
*/

// Keeps this file a valid ES module while its code is commented out.
export {};
