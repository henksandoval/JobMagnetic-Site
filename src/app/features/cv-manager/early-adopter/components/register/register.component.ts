import { Component, inject } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileService } from '../../services/profile.service';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ProfileComponent, NgIf, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly profileService: ProfileService = inject(ProfileService);
  register$ = this.profileService.register$;

  saveForm<T>(urlEndpoint: string, data: T): void {
    if (urlEndpoint != null) {
      this.profileService.saveData<T>(urlEndpoint, data).subscribe({
        next: (response) => {
          console.log(`Section ${urlEndpoint} saved successfully`, response);
          alert('¡Datos guardados exitosamente!');
        },
        error: (err) => {
          console.error(`Error saving section ${urlEndpoint}`, err);
        },
      });
    }
  }
}
