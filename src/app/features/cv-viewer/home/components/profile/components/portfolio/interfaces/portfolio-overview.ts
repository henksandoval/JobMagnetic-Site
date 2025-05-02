import { Gallery } from './gallery';

export interface PortfolioOverview {
  sortedPages: Gallery[];
  pagesByType: string[];
}
