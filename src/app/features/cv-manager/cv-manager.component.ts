import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import {
  MatAnchor,
  MatButton,
  MatFabAnchor,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cv-manager',
  imports: [
    RouterOutlet,
    MatDivider,
    MatIcon,
    MatFabAnchor,
    RouterLink,
    MatMiniFabButton,
    MatFabButton,
    MatIconButton,
    MatAnchor,
    MatButton,
    MatLabel,
    MatFormField,
    MatInput,
  ],
  templateUrl: './cv-manager.component.html',
  styleUrl: './cv-manager.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CvManagerComponent {}
