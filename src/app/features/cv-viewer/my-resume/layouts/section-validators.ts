import { Profile } from '../components/profile/interfaces/profile';

export const SECTION_VALIDATORS = new Map<string, (profile: Profile) => boolean>([
  ['hero',         (p) => !!p.personalData && !!p.about],
  ['about',        (p) => !!p.about],
  ['resume',       (p) => !!p.summary && (p.summary.education.academicBackground.length > 0 || p.summary.workExperience.position.length > 0)],
  ['portfolio',    (p) => !!p.portfolioGallery && p.portfolioGallery.length > 0],
  ['skills',       (p) => !!p.skillSet && p.skillSet.skillDetails.length > 0],
  ['services',     (p) => !!p.service && p.service.serviceDetails.length > 0],
  ['testimonials', (p) => !!p.testimonials && p.testimonials.length > 0],
  ['contact',      (p) => !!p.contact],
]);
