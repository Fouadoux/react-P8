import { loadSiteData } from '../lib/siteData';

export const skillsApi = {
  findAll: () => loadSiteData().then((data) => data.skills),
};
