import { GalleryFormItems } from './galleryFormItems';

export interface ServiceBase {
  profileId: string;
  overview: string;
  galleryItems: GalleryFormItems[];
}
