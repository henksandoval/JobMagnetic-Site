import { ServiceDetails } from './service-details';

export interface Service {
  overview: string;
  serviceDetails: ServiceDetails[];
}
