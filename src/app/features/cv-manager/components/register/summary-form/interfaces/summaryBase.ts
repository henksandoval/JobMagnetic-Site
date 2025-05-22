import { Education } from './education';
import { WorkExperience } from './work-experience';

export interface SummaryBase {
  profileId: string;
  introduction: string;
  education: Education[];
  workExperiences: WorkExperience[];
}
