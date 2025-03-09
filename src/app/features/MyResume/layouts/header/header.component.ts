import { Component, inject, model } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT, NgClass, NgFor } from '@angular/common';
import { MenuSection } from './interfaces/menu-section';
import { SCROLL_DELAY_MS } from './constants';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
    selector: 'app-header',
    imports: [NgClass, NgFor, AppIdDirective],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  sections = model<Map<string, MenuSection>>();
  activeSectionId = 'hero';

  private readonly pageScrollService: PageScrollService = inject(PageScrollService);
  private readonly document: Document = inject(DOCUMENT);

  setActive(section: MenuSection): void {
    this.deactivateAllSections();
    section.isActive = true;
    setTimeout(() => this.scrollTo(section.target), SCROLL_DELAY_MS);
  }

  private deactivateAllSections(): void {
    this.sections()?.forEach((section) => {
      section.isActive = false;
    });
  }

  scrollTo(target: string): void {
    this.activeSectionId = target;
    this.pageScrollService.scroll({ document: this.document, scrollTarget: `#${this.activeSectionId}` });
  }
}
