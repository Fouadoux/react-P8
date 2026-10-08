import { mockClient } from './mockClient';
import { profile } from '../data';
import type { Profile } from '../types/profile';

export const profileApi = {
  getProfile: () => mockClient.get<Profile>('/profile', profile),
};