import { Guid } from 'guid-typescript';

export interface WorkExperience {
  correlationId?: Guid;
  jobTitle: string;
  companyName: string;
  companyLocation: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  responsibilities: string[];
}
