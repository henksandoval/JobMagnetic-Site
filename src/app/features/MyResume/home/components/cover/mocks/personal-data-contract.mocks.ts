import { UserPersonalDataContract } from '../contracts/user-personal-data-contract';
import { SocialNetworkTypes } from '@core/constants/social-network-def';

export const mockPersonalDataContract: UserPersonalDataContract = {
  name: 'Max Payne',
  professions: ['Developer', 'QA', 'DevOps'],
  socialNetworks: [
    { type: SocialNetworkTypes.Twitter, url: 'https://twitter.com/developer' },
    { type: SocialNetworkTypes.Facebook, url: 'https://facebook.com/developer' },
    { type: SocialNetworkTypes.LinkedIn, url: 'https://linkedin.com/developer' },
  ],
};
