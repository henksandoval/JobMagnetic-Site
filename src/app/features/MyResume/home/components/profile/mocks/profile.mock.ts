import { Profile } from '../interfaces/profile';
import { mockSummary } from '../components/summary/mocks/summary.mock';
import { mockAbout } from '../components/about/mocks/about.mock';
import { mockPortfolio } from '../components/portfolio/mocks/portfolio.mock';
import { mockService } from '../components/services/mocks/service.mock';
import { mockSkills } from '../components/skils/mocks/skills.mock';
import { mockTestimonials } from '../components/testimonials/mocks/testimonials.mocks';
import { mockContact } from '../components/contact/mocks/contactProfile.mock';
import { mockPersonalData } from '../../cover/mocks/personalData.mocks';

export const mockProfile: Profile = {
  personalData: mockPersonalData,
  birthday: '01/01/1990',
  contact: mockContact,
  about: mockAbout,
  facts: {
    Awards: 'awards',
    description: 'description',
    happyClients: 'happy',
    hoursOfSupport: '10',
    projects: 'project',
  },
  skillSet: mockSkills,
  summary: mockSummary,
  testimonials: mockTestimonials,
  portfolio: mockPortfolio,
  service: mockService,
};
