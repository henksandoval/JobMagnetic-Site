import { SkillItemBase } from './SkillItemBase';

export interface SkillBase{
  profileId: string;
  overview: string;
  skillDetails: SkillItemBase[];
}
