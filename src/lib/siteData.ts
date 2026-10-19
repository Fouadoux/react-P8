// Site data lives in public/data.json, served as a static file: it can be edited
// and picked up without a rebuild. This module loads it once, then hydrates it:
// icon names become react-icons components, and the projects' skillIds become
// references to the matching skill objects.
import { SKILL_ICONS } from './icons';
import type { Profile } from '../types/profile';
import type { Project } from '../types/project';
import type { Skill } from '../types/skill';

// Raw shapes as they appear in data.json.
export interface RawSkill {
  id: number;
  name: string;
  category: string;
  icon?: string;
  iconColor?: string;
}

export interface RawProjectImage {
  src: string;
  caption: string;
}

export interface RawProject {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  gallery?: RawProjectImage[];
  content: string | null;
  highlights?: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  createdAt: string;
  skillIds: number[];
}

export interface RawSiteData {
  contactEmail: string;
  githubUrl: string;
  profile: Profile;
  skills: RawSkill[];
  projects: RawProject[];
}

// Site data ready to be consumed by the app.
export interface SiteData {
  contactEmail: string;
  githubUrl: string;
  profile: Profile;
  skills: Skill[];
  projects: Project[];
}

let cache: Promise<SiteData> | null = null;

// Loads /data.json a single time; every API call shares the same request.
export function loadSiteData(): Promise<SiteData> {
    cache ??= fetch('/data.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status} au chargement de data.json`);
          }
          return response.json() as Promise<RawSiteData>;
        })
        .then(hydrate)
        .catch((error:unknown) => {
          cache = null;
          throw error;
        });

  return cache;

}

function hydrate(raw: RawSiteData): SiteData {
  const skills: Skill[] = raw.skills.map((skill) => {
    const { icon, ...rest } = skill;
    return icon ? { ...rest, icon: SKILL_ICONS[icon] } : rest;
  });

  const skillById = new Map(skills.map((skill) => [skill.id, skill]));

  const projects: Project[] = raw.projects.map((project) => {
    const { skillIds, ...rest } = project;
    return {
      ...rest,
      skills: skillIds
        .map((id) => skillById.get(id))
        .filter((skill): skill is Skill => skill !== undefined),
    };
  });

  return {
    contactEmail: raw.contactEmail,
    githubUrl: raw.githubUrl,
    profile: raw.profile,
    skills,
    projects,
  };
}
