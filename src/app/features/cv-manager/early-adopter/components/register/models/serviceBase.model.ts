import { GalleryFormItems } from './galleryFormItems.model';

export interface ServiceBase {
  profileId: string;
  Overview: string;
  galleryItems: GalleryFormItems[];
}
