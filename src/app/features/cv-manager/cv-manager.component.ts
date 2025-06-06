import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cv-manager',
  imports: [
    RouterOutlet,
    // MatDivider,
    // MatIcon,
    // MatFabAnchor,
    // RouterLink,
    // MatMiniFabButton,
    // MatFabButton,
    // MatIconButton,
    // MatAnchor,
    // MatButton,
    // MatLabel,
    // MatFormField,
    // MatInput,
  ],
  templateUrl: './cv-manager.component.html',
  styleUrl: './cv-manager.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CvManagerComponent {}
