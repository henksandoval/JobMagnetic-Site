import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import GLightbox from 'glightbox';
import { Gallery } from './interfaces/gallery';
import { PortfolioOverview } from './interfaces/portfolio-overview';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
  selector: 'app-portfolio',
  imports: [NgClass, AppIdDirective],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent implements AfterViewInit {
  filteredPages = signal<Gallery[]>([]);
  public activeFilter = '*';
  portfolioSet = input.required<PortfolioOverview, Gallery[]>({
    transform: this.toPortfolioOverview.bind(this),
  });


  toPortfolioOverview(galleries: Gallery[]): PortfolioOverview {
    const overview = {
      pagesByType: this.groupWebPagesByType(galleries),
      sortedPages: this.sortWebPages(galleries),
    };
    this.filteredPages.set(overview.sortedPages);
    return overview;
  }

  ngAfterViewInit() {
    this.initializeGLightbox();
  }

  private sortWebPages(webPages: Gallery[]): Gallery[] {
    return [...webPages].sort((a, b) => a.position - b.position);
  }

  private groupWebPagesByType(webPages: Gallery[]): string[] {
    return Array.from(new Set(webPages.map((webPage) => webPage.type)));
  }

  public filterPortfolio(type: string): void {
    this.activeFilter = type;

    debugger;
    const allPages = this.portfolioSet()?.sortedPages;
    if (!allPages) return;

    if (type === '*') {
      this.filteredPages.set(allPages);
    } else {
      this.filteredPages.set(allPages.filter(page => page.type === type));
    }
  }

  private initializeGLightbox(): void {
    GLightbox({ selector: '.glightbox-image' });
    GLightbox({ selector: '.glightbox-web', width: '90%', height: '90vh' });
  }
}
