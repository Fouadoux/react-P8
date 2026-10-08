import { mockClient } from './mockClient';
import { projects, getProjectById } from '../data';
import type { Project } from '../types/project';

export const projectsApi = {
  findAll: () => mockClient.get<Project[]>('/projects', projects),
  findById: (id: number) => mockClient.get<Project | undefined>(`/projects/${id}`, getProjectById(id)),
  findBySkill: (skill: string) =>
    mockClient.get<Project[]>(
      `/projects?skill=${encodeURIComponent(skill)}`,
      projects.filter((p) => p.skills.some((s) => s.name.toLowerCase() === skill.toLowerCase()))
    ),
};