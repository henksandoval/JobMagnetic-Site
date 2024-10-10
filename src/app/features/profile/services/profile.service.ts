import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly profileSource = signal<Profile | null>(null);
  private readonly profileLoaded = signal(false);

  profile$ = computed(() => this.profileSource());
  private readonly http = inject(HttpClient);

  loadProfile(): void {
    if (!this.profileLoaded()) {
      this.http
        .get<Profile>('stubs/data.json')
        .pipe(
          tap((data: Profile) => {
            this.profileSource.set(data);
            this.profileLoaded.set(true);
          }),
          catchError(() => {
            return of(null);
          })
        )
        .subscribe();
    }
  }
}
