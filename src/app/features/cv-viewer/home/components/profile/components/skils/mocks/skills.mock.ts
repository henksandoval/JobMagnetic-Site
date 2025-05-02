import { SkillDetail } from '../interfaces/skill-detail';
import { SkillSet } from '../interfaces/skills';

const csharpSkill: SkillDetail = {
  name: 'C #',
  iconUrl: 'https://cdn.simpleicons.org/dotnet',
  rank: 1,
};

const javascriptSkill: SkillDetail = {
  name: 'JS',
  iconUrl: 'https://cdn.simpleicons.org/javascript',
  rank: 2,
};

const typescriptSkill: SkillDetail = {
  name: 'TS',
  iconUrl: 'https://cdn.simpleicons.org/typescript',
  rank: 3,
};

const angularSkill: SkillDetail = {
  name: 'Angular',
  iconUrl: 'https://cdn.simpleicons.org/angular',
  rank: 4,
};

export const mockSkills: SkillSet = {
  overview:
    'I am a backend developer,I haven`t problem going out of my comfort zone to learn new languages or frameworks.',
  skillDetails: [csharpSkill, typescriptSkill, javascriptSkill, angularSkill],
};
