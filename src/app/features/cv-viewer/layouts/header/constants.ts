import { MenuSection } from './interfaces/menu-section';

export const SCROLL_DELAY_MS = 250;

export const MENU_SECTIONS = new Map<string, MenuSection>([
  ['hero', { target: 'hero', icon: 'bx-home', label: 'Home', isActive: true }],
  ['about', { target: 'about', icon: 'bx-user', label: 'About', isActive: false }],
  ['resume', { target: 'summary', icon: 'bx-file-blank', label: 'Resume', isActive: false }],
  ['portfolio', { target: 'portfolio', icon: 'bx-book-content', label: 'Portfolio', isActive: false }],
  ['skills', { target: 'skills', icon: 'bx-brain', label: 'Skills', isActive: false }],
  ['facts', { target: 'facts', icon: 'bx-user', label: 'Facts', isActive: false }],
  ['services', { target: 'services', icon: 'bx-server', label: 'Services', isActive: false }],
  ['testimonials', { target: 'testimonials', icon: 'bx-server', label: 'Testimonials', isActive: false }],
  ['contact', { target: 'contact', icon: 'bx-envelope', label: 'Contact', isActive: false }],
]);
