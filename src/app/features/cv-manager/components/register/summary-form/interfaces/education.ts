import { Guid } from 'guid-typescript';

export interface Education {
  correlationId?: Guid;
  degree: string;
  institutionName: string;
  institutionLocation: string;
  description: string;
  startDate: Date;
  endDate?: Date;
}
