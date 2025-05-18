import { Component } from '@angular/core';
import { NavBarComponent } from './layouts/nav-bar/nav-bar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';

@Component({
  selector: 'app-early-access',
  imports: [NavBarComponent, HeroSectionComponent],
  templateUrl: './early-access.component.html',
  styleUrl: './early-access.component.scss',
})
export class EarlyAccessComponent {}
