import { SkillSet } from '../components/skils/interfaces/skills';
import { Testimonial } from '../components/testimonials/interfaces/testimonial';
import { PortFolio } from '../components/portfolio/interfaces/portfolio';
import { Service } from '../components/services/interfaces/service';
import { About } from '../components/about/interfaces/about';
import { Contact } from '../components/contact/interfaces/contact';
import { Summary } from '../components/summary/interfaces/summary';
import { UserPersonalData } from '../../cover/interfaces/user-personal-data';

export interface Profile {
  personalData: UserPersonalData;
  birthday?: string;
  contact?: Contact;
  about: About;
  skillSet?: SkillSet;
  summary: Summary;
  testimonials: Testimonial[];
  portfolio: PortFolio;
  service: Service;
}
