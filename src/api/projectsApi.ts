import { loadSiteData } from '../lib/siteData';

export const projectsApi = {
  findAll: () => loadSiteData().then((data) => data.projects),
  findById: (id: number) =>
    loadSiteData().then((data) => data.projects.find((project) => project.id === id)),
  findBySkill: (skill: string) =>
    loadSiteData().then((data) =>
      data.projects.filter((project) =>
        project.skills.some((s) => s.name.toLowerCase() === skill.toLowerCase())
      )
    ),
};
