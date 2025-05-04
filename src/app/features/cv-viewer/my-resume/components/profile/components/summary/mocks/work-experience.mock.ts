import { Position } from '../interfaces/position';
import { WorkExperience } from '../interfaces/work-experience';

export const mockPosition1: Position = {
  specialist: 'Senior UX Designer',
  startdate: '2020-05-01',
  location: 'San Francisco, CA',
  communicationDesignLeadership: 'Led cross-functional design reviews',
  teamLeadership: 'Managed a team of 5 designers',
  designQualityAssurance: 'Implemented QA processes for design consistency',
  expertiseArea: 'User Experience Design',
};

export const mockPosition2: Position = {
  specialist: 'Product Designer',
  startdate: '2018-09-15',
  location: 'New York, NY',
  communicationDesignLeadership: 'Facilitated workshops with stakeholders',
  teamLeadership: 'Coached junior designers',
  designQualityAssurance: 'Conducted usability testing sessions',
  expertiseArea: 'Product Design',
};

export const mockPosition3: Position = {
  specialist: 'Graphic Designer',
  startdate: '2016-03-20',
  location: 'Austin, TX',
  communicationDesignLeadership: 'Developed branding guidelines',
  teamLeadership: 'Collaborated with marketing teams',
  designQualityAssurance: 'Reviewed design assets for branding compliance',
  expertiseArea: 'Graphic Design',
};

export const mockWorkExperience: WorkExperience = {
  position: [mockPosition1, mockPosition2, mockPosition3],
};
