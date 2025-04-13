import { ProfileContract } from '../contracts/profile-contract';
import { mockSummary } from '../components/summary/mocks/summary.mock';
import { mockAbout } from '../components/about/mocks/about.mock';
import { mockPortfolio } from '../components/portfolio/mocks/portfolio.mock';
import { mockService } from '../components/services/mocks/service.mock';
import { mockSkills } from '../components/skils/mocks/skills.mock';
import { mockTestimonials } from '../components/testimonials/mocks/testimonials.mocks';
import { mockContact } from '../components/contact/mocks/contact-profile.mock';
import { mockPersonalDataContract } from '../../cover/mocks/personal-data-contract.mocks';

export const mockProfileContract: ProfileContract = {
  profileImageUrl: "https://bootstrapmade.com/content/demo/MyResume/assets/img/profile-img.jpg",
  firstName: "Max",
  lastName: "Payne",
  birthDate: "1990-04-01",
  middleName: '',
  secondLastName: undefined,
  personalData: mockPersonalDataContract,
  birthday: '01/01/1990',
  contact: mockContact,
  about: mockAbout,
  skillSet: mockSkills,
  summary: mockSummary,
  testimonials: mockTestimonials,
  portfolio: mockPortfolio,
  service: mockService,
};
