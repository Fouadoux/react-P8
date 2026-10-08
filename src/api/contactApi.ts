import { mockClient } from './mockClient';
import type { ContactMessage, ContactMessageInput } from '../types/contactMessage';

export const contactApi = {
  send: (input: ContactMessageInput) => mockClient.post<ContactMessage>('/contact', { ...input, id: Date.now(), sentAt: new Date().toISOString() }),
};