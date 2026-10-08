import { mockClient } from './mockClient';
import { skills } from '../data';
import type { Skill } from '../types/skill';

export const skillsApi = {
  findAll: () => mockClient.get<Skill[]>('/skills', skills),
};