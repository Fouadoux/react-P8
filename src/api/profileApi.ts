import { loadSiteData } from '../lib/siteData';

export const profileApi = {
  getProfile: () => loadSiteData().then((data) => data.profile),
};
