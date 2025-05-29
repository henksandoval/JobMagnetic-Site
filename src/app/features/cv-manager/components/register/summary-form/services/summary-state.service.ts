import { Injectable, Signal, signal } from '@angular/core';
import { Education } from '../interfaces/education';


@Injectable({
  providedIn: 'root',
})
export class SummaryStateService {
  private readonly _educations = signal<Education | null>(null);

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
}
