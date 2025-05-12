import { GalleryFormItems } from './galleryFormItems.model';

export interface ServiceFormBaseModel {
  profileId: string;
  Overview: string;
  galleryItems: GalleryFormItems[];
}
