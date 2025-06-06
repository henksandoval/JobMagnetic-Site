import { SkillItemBase } from './SkillItemBase';

export interface SkillData{
  profileId: string;
  overview: string;
  skillDetails: SkillItemBase[];
}
