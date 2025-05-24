import { ProfileDataModel } from './ProfileData';

export interface ResponseBackendModel {
  id: string;
  profileData: ProfileDataModel | null;
}
