import { UserSocialNetworkContract } from './user-social-network-contract';

export interface UserPersonalDataContract {
  name: string;
  professions: string[];
  socialNetworks: UserSocialNetworkContract[];
}
