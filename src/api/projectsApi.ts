import { loadSiteData } from '../lib/siteData';

export const projectsApi = {
  findAll: () => loadSiteData().then((data) => data.projects),
  findById: (id: number) =>
    loadSiteData().then((data) => data.projects.find((project) => project.id === id)),
};
