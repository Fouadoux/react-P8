import type { IconType } from 'react-icons';

export const SKILL_CATEGORIES =['Backend', 'Frontend', 'Base de données', 'DevOps', 'Outils'] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

const CATEGORY_BADGE_STYLES: Record<SkillCategory, string> = {
  Backend: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
  Frontend: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  'Base de données': 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  DevOps: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  Outils: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300',
};

const CATEGORY_SOLID_STYLES: Record<SkillCategory, string> = {
  Backend: 'bg-indigo-600 text-white',
  Frontend: 'bg-sky-600 text-white',
  'Base de données': 'bg-amber-600 text-white',
  DevOps: 'bg-emerald-600 text-white',
  Outils: 'bg-pink-600 text-white',
};

const DEFAULT_BADGE_STYLE = 'bg-neutral-100 text-neutral-700 dark:bg-neutral-500/15 dark:text-neutral-300';
const DEFAULT_SOLID_STYLE = 'bg-neutral-600 text-white';

export function getCategoryBadgeClasses(category: string): string {
  return CATEGORY_BADGE_STYLES[category as SkillCategory] ?? DEFAULT_BADGE_STYLE;
}

export function getCategorySolidClasses(category: string): string {
  return CATEGORY_SOLID_STYLES[category as SkillCategory] ?? DEFAULT_SOLID_STYLE;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  // Brand icon and its color; without a color the icon follows the text color
  // (useful for logos that are black, invisible in dark mode).
  icon?: IconType;
  iconColor?: string;
}

export interface SkillInput {
  name: string;
  category: string;
}
