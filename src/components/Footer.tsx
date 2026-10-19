import { useCallback } from 'react';
import { profileApi } from '../api/profileApi';
import { siteApi } from '../api/siteApi';
import { useFetch } from '@/hooks/useFetch.ts';

const FOOTER_LINK_CLASS = 'underline underline-offset-4 transition-colors hover:text-primary';
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {

    const fetchSiteInfo = useCallback(() => siteApi.getInfo(), []);
    const {data: siteInfo} = useFetch(fetchSiteInfo);
    const fetchProfile = useCallback(() => profileApi.getProfile(), []);
    const {data: profile} = useFetch(fetchProfile);

    return (
        <footer className="border-t border-border">
            <div
                className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-8 text-sm text-muted-foreground">
                <p>Fouad Benhadda, {CURRENT_YEAR}</p>
                <p className="flex gap-6">
                    {siteInfo?.contactEmail && (
                        <a href={`mailto:${siteInfo.contactEmail}`} className={FOOTER_LINK_CLASS}>
                            {siteInfo.contactEmail}
                        </a>
                    )}
                    {siteInfo?.githubUrl && (
                        <a href={siteInfo.githubUrl} target="_blank" rel="noreferrer" className={FOOTER_LINK_CLASS}>
                            GitHub
                        </a>
                    )}
                    {profile?.linkedinUrl && (
                        <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className={FOOTER_LINK_CLASS}>
                            LinkedIn
                        </a>
                    )}
                </p>
            </div>
        </footer>
    );
}
