import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, input } from '@angular/core';
import GLightbox from 'glightbox';
import { Gallery } from './interfaces/gallery';
import { PortfolioOverview } from './interfaces/portfolio-overview';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
    selector: 'app-portfolio',
    imports: [NgClass, AppIdDirective],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements AfterViewInit {
  portfolioSet = input.required<PortfolioOverview, Gallery[]>({
    transform: this.toPortfolioOverview.bind(this),
  });

  private sortWebPages(webPages: Gallery[]): Gallery[] {
    return [...webPages].sort((a, b) => a.position - b.position);
  }

  private groupWebPagesByType(webPages: Gallery[]): string[] {
    return Array.from(new Set(webPages.map((webPage) => webPage.type)));
  }

  toPortfolioOverview(galleries: Gallery[]): PortfolioOverview {
    return {
      pagesByType: this.groupWebPagesByType(galleries),
      sortedPages: this.sortWebPages(galleries),
    };
  }

  ngAfterViewInit() {
    this.initializeGLightbox();
  }

  private initializeGLightbox(): void {
    GLightbox({ selector: '.glightbox-image' });
    GLightbox({ selector: '.glightbox-web', width: '90%', height: '90vh' });
  }
}
