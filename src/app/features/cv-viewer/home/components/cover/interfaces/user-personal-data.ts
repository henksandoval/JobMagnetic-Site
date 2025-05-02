import { UserSocialNetwork } from './user-social-network';

export interface UserPersonalData {
  name: string;
  professions: string[];
  socialNetworks: UserSocialNetwork[];
}
