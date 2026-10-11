import { loadSiteData } from '../lib/siteData';

export interface SiteInfo {
  contactEmail: string;
  githubUrl: string;
}

// Static site info (contact address, GitHub link) from data.json.
export const siteApi = {
  getInfo: () => loadSiteData().then(({ contactEmail, githubUrl }) => ({ contactEmail, githubUrl })),
};
