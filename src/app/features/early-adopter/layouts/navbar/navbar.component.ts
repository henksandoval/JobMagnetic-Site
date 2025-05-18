import { Component, HostListener } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = true;

  navLinks = [
    { name: 'Características', href: '#features' },
    { name: 'Cómo funciona', href: '#how-it-works' },
    { name: 'Testimonios', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
