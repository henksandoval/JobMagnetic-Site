import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  userName = signal<string>('');
  private readonly _profileId = signal<string | null>(null);

  get profileId(): Signal<string | null> {
    return this._profileId.asReadonly();
  }

  setProfileId(profileId: string): void {
    if (profileId.trim() === '') {
      throw new Error('The profileId cannot be empty.');
    }
    this._profileId.set(profileId);
  }

  tryGetProfileId(): string {
    const id = this._profileId();
    if (!id) {
      throw new Error('The profileId is not defined.');
    }
    return id;
  }
}
