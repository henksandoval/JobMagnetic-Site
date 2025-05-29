import { Injectable, Signal, signal } from '@angular/core';
import { GalleryFormItems } from '../interfaces/galleryFormItems';


@Injectable({
  providedIn: 'root',
})
export class ServiceStateService {
  private readonly _serviceCommand = signal<GalleryFormItems | null>(null);

  get serviceCommand(): Signal<GalleryFormItems | null> {
    return this._serviceCommand.asReadonly();
  }

  setServiceCommand(command: GalleryFormItems): void {
    if (!command) {
      throw new Error('The Command cannot be empty.');
    }
    this._serviceCommand.set(command);
  }

  clearServiceCommand(): void {
    this._serviceCommand.set(null);
  }
}
