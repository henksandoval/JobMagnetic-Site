import { UserPersonalDataContract } from '../contracts/user-personal-data-contract';
import { SocialNetworkTypes } from '@core/constants/social-network-def';

export const mockPersonalDataContract: UserPersonalDataContract = {
  name: 'Max Payne',
  professions: ['Developer', 'QA', 'DevOps'],
  socialNetworks: [
    {
      type: SocialNetworkTypes.Twitter.name,
      iconClass: SocialNetworkTypes.Twitter.icon,
      value: 'https://twitter.com/developer',
    },
    {
      type: SocialNetworkTypes.Facebook.name,
      iconClass: SocialNetworkTypes.Facebook.icon,
      value: 'https://facebook.com/developer',
    },
    {
      type: SocialNetworkTypes.LinkedIn.name,
      iconClass: SocialNetworkTypes.LinkedIn.icon,
      value: 'https://linkedin.com/developer',
    },
  ],
};
