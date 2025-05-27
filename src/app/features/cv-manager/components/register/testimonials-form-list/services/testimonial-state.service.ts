import { Injectable, Signal, signal } from '@angular/core';
import { TestimonialCommand } from '../interfaces/testimonialCommand';

@Injectable({
  providedIn: 'root',
})
export class TestimonialStateService {
  private readonly _testimonialCommand = signal<TestimonialCommand | null>(null);

  get testimonialCommand(): Signal<TestimonialCommand | null> {
    return this._testimonialCommand.asReadonly();
  }

  setTestimonialCommand(command: TestimonialCommand): void {
    if (!command) {
      throw new Error('The Command cannot be empty.');
    }
    this._testimonialCommand.set(command);
  }

  clearTestimonialCommand(): void {
    this._testimonialCommand.set(null);
  }
}
