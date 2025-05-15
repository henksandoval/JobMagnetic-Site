import { GalleryFormItems } from './galleryFormItems.model';

export interface ServiceBase {
  profileId: string;
  overview: string;
  galleryItems: GalleryFormItems[];
}
