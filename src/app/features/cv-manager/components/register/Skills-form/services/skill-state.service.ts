import { Injectable, Signal, signal } from '@angular/core';
import { SkillItemBase } from '../interfaces/SkillItemBase';

@Injectable({
  providedIn: 'root',
})
export class SkillStateService {
  private readonly _skillItemBase = signal<SkillItemBase | null>(null);

  get skillItemBase(): Signal<SkillItemBase | null> {
    return this._skillItemBase.asReadonly();
  }

  setSkillItemBase(skillItem: SkillItemBase): void {
    if (!skillItem) {
      throw new Error('The Command cannot be empty.');
    }
    this._skillItemBase.set(skillItem);
  }

  clearSkillItemBase(): void {
    this._skillItemBase.set(null);
  }
}
