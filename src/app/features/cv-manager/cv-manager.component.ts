import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cv-manager',
  imports: [RouterOutlet, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './cv-manager.component.html',
  styleUrl: './cv-manager.component.scss',
})
export class CvManagerComponent {}
