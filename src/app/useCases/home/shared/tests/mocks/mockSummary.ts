import { Summary } from '../../../shared/models/summary';
import { mockContactProfile } from './mockContactProfile';

export const mockSummary: Summary = {
  about: 'I am a software developer',
  name: 'Brahando test',
  introduction:
    'Innovative and deadline-driven Graphic Designer with 3+ years of experience designing and developing user-centered digital/print marketing material from initial concept to final, polished deliverable.',
  contact: [mockContactProfile],
};
