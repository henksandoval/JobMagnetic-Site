import { Injectable, Signal, signal } from '@angular/core';
import { Education } from '../interfaces/education';
import { WorkExperience } from '../interfaces/work-experience';

@Injectable({
  providedIn: 'root',
})
export class SummaryStateService {
  private readonly _educations = signal<Education | null>(null);
  private readonly _workExperience = signal<WorkExperience | null>(null);

  get educationCommand(): Signal<Education | null> {
    return this._educations.asReadonly();
  }

  setEducation(command: Education): void {
    if (!command) {
      throw new Error('The Command cannot be empty.');
    }
    this._educations.set(command);
  }

  clearEducation(): void {
    this._educations.set(null);
  }

  get workExperienceCommand(): Signal<WorkExperience | null> {
    return this._workExperience.asReadonly();
  }

  setWorkExperience(command: WorkExperience): void {
    if (!command) {
      throw new Error('The Command cannot be empty.');
    }
    this._workExperience.set(command);
  }

  clearWorkExperience(): void {
    this._workExperience.set(null);
  }
}
