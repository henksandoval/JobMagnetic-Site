import { SkillSet } from '../components/skils/interfaces/skills';
import { Testimonial } from '../components/testimonials/interfaces/testimonial';
import { Service } from '../components/services/interfaces/service';
import { About } from '../components/about/interfaces/about';
import { Contact } from '../components/contact/interfaces/contact';
import { Summary } from '../components/summary/interfaces/summary';
import { UserPersonalData } from '../../cover/interfaces/user-personal-data';
import { Gallery } from '../components/portfolio/interfaces/gallery';

export interface Profile {
  personalData: UserPersonalData;
  birthday?: string;
  contact?: Contact;
  about?: About;
  skillSet?: SkillSet;
  summary?: Summary;
  testimonials?: Testimonial[];
  project: Gallery[];
  service?: Service;
}
