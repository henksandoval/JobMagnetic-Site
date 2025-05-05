import { Summary } from '../interfaces/summary';
import { mockEducation } from './education.mock';
import { mockWorkExperience } from './work-experience.mock';

export const mockSummary: Summary = {
  introduction:
    'Innovative and deadline-driven Graphic Designer with 3+ years of experience designing and developing user-centered digital/print marketing material from initial concept to final, polished deliverable.',
  workExperience: mockWorkExperience,
  education: mockEducation,
};
