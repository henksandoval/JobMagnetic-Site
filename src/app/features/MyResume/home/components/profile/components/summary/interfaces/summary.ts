import { Education } from './education';
import { WorkExperience } from './work-experience';

export interface Summary {
  introduction: string;
  education: Education;
  workExperience: WorkExperience;
}
