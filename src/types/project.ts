import type { Skill } from './skill';

export interface ProjectImage {
  src: string;
  // Describes what the screenshot shows: used as alt text and as visible caption.
  caption: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  // Screenshots shown on the detail page, in display order (the first one is displayed larger).
  gallery?: ProjectImage[];
  content: string | null;
  // Short technical points worth a recruiter's attention, one sentence each.
  highlights?: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  createdAt: string;
  skills: Skill[];
}

export interface ProjectInput {
  title: string;
  description: string;
  imageUrl: string | null;
  content: string | null;
  repoUrl: string | null;
  demoUrl: string | null;
  skillIds: number[];
}
