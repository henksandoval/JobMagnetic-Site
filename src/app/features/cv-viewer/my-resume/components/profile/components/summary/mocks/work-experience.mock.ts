import { Position } from '../interfaces/position';
import { WorkExperience } from '../interfaces/work-experience';

export const mockPosition1: Position = {
  specialist: 'Senior UX Designer',
  rangeDate: '2020-2022',
  location: 'San Francisco, CA',
  description: 'Led design projects for various clients',
  responsibilities: [
    'Conducted user research',
    'Created wireframes and prototypes',
    'Collaborated with developers',
  ]
};

export const mockPosition2: Position = {
  specialist: 'Product Designer',
  rangeDate: '2018-2020',
  location: 'New York, NY',
  description: 'Designed user interfaces for web applications',
  responsibilities: [
    'Developed design systems',
    'Worked closely with product managers',
    'Ensured design consistency across products',
  ]
};

export const mockPosition3: Position = {
  specialist: 'Graphic Designer',
  rangeDate: '2016-2019',
  location: 'Austin, TX',
  description: 'Created visual content for marketing campaigns',
  responsibilities: [
    'Designed logos and branding materials',
    'Collaborated with marketing teams',
    'Reviewed design assets for branding compliance',
  ]
};

export const mockWorkExperience: WorkExperience = {
  position: [mockPosition1, mockPosition2, mockPosition3],
};
