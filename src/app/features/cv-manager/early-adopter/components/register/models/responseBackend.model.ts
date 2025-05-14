import { ProfileDataModel } from './ProfileData.model';

export interface ResponseBackendModel {
  id: string;
  profileData: ProfileDataModel | null;
}
