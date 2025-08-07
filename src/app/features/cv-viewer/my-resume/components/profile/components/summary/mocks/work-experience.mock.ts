import { Position } from '../interfaces/position';
import { WorkExperience } from '../interfaces/work-experience';

export const mockPosition1: Position = {
  specialist: 'Senior UX Designer',
  startDate: '2020, May',
  endDate: '',
  location: 'San Francisco, CA',
  description: 'Led design initiatives for a major product overhaul',
  responsibilities: [
    'Conducted user research to gather insights',
    'Designed user interfaces for web and mobile applications',
    'Collaborated with product managers to define project scope',
    'Created high-fidelity prototypes for stakeholder review',
    'Led design sprints to rapidly iterate on concepts',
    'Ensured accessibility standards were met in all designs',
    'Provided feedback to developers during implementation',
    'Maintained design documentation and style guides',
  ],
};

export const mockPosition2: Position = {
  specialist: 'Product Designer',
  startDate: '2018, September',
  endDate: '2020, April',
  location: 'New York, NY',
  description: 'Worked on a cross-functional team to enhance user experience',
  responsibilities: [
    'Led design workshops with cross-functional teams',
    'Created wireframes and prototypes for new features',
    'Collaborated with developers to ensure design feasibility',
    'Analyzed user feedback to improve product usability',
    'Mentored junior designers on best practices',
  ],
};

export const mockPosition3: Position = {
  specialist: 'Graphic Designer',
  startDate: '2016, March',
  endDate: '2018, August',
  location: 'Austin, TX',
  description: 'Designed visual assets for marketing and branding',
  responsibilities: [
    'Developed visual concepts for marketing campaigns',
    'Designed print materials such as brochures and flyers',
    'Worked with clients to understand their design needs',
    'Managed multiple projects under tight deadlines',
    'Created style guides to maintain brand consistency',
  ],
};

export const mockWorkExperience: WorkExperience = {
  position: [mockPosition1, mockPosition2, mockPosition3],
};
