import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { NgClass } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-cover',
    imports: [NgClass],
    templateUrl: './cover.component.html',
    styleUrl: './cover.component.scss'
})
export class CoverComponent implements OnInit, OnDestroy {
  private professionSubscription: Subscription | undefined;
  private typeProfessionSubscription: Subscription | undefined;
  private readonly profileService: ProfileService = inject(ProfileService);
  private professionIndex = 0;
  private charIndex = 0;
  profile$ = this.profileService.profile$;
  professions$ = computed(() => this.profile$()?.personalData?.professions || []);
  currentProfession$ = signal<string>('');

  ngOnInit() {
    this.professionSubscription = interval(1000).subscribe(() => {
      this.startTyping();
    });
  }

  ngOnDestroy() {
    this.professionSubscription?.unsubscribe();
    this.typeProfessionSubscription?.unsubscribe();
  }

  private startTyping(): void {
    const professions = this.professions$();
    if (professions && professions.length > 0) {
      const profession = professions[this.professionIndex];
      this.typeProfessionSubscription?.unsubscribe();
      this.typeProfessionSubscription = interval(250).subscribe((): void => {
        if (this.charIndex < profession.length) {
          this.currentProfession$.set(profession.substring(0, this.charIndex + 1));
          this.charIndex++;
        } else {
          this.typeProfessionSubscription?.unsubscribe();
          this.charIndex = 0;
          this.professionIndex = (this.professionIndex + 1) % professions.length;
        }
      });
    }
  }
}
