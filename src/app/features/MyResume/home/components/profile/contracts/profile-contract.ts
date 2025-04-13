import { Facts } from '../components/fact/interfaces/facts';
import { SkillSet } from '../components/skils/interfaces/skills';
import { Testimonial } from '../components/testimonials/interfaces/testimonial';
import { PortFolio } from '../components/portfolio/interfaces/portfolio';
import { Service } from '../components/services/interfaces/service';
import { About } from '../components/about/interfaces/about';
import { Contact } from '../components/contact/interfaces/contact';
import { Summary } from '../components/summary/interfaces/summary';
import { UserPersonalDataContract } from '../../cover/contracts/user-personal-data-contract';

export interface ProfileContract {
  profileImageUrl: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  middleName?: string;
  secondLastName?: string;
  personalData?: UserPersonalDataContract;
  birthday?: string;
  contact?: Contact;
  about?: About;
  facts?: Facts;
  skillSet?: SkillSet;
  summary?: Summary;
  testimonials?: Testimonial[];
  portfolio?: PortFolio;
  service?: Service;
}
