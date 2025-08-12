import { PortfolioComponent } from './portfolio.component';
import { fireEvent, render, screen } from '@testing-library/angular';
import { mockPortfolio } from './mocks/portfolio.mock';
import { Gallery } from './interfaces/gallery';
import { mockProfile } from '../../mocks/profile.mock';
import userEvent from '@testing-library/user-event';

const renderComponent = async () => {
  await render(PortfolioComponent, {
    inputs: {
      portfolioSet: mockPortfolio,
    },
  });
};

describe(PortfolioComponent.name, () => {
  const user = userEvent.setup();
  beforeEach(async () => {
    await renderComponent();
  });

  it('should display only the items of the selected type and hide all others', async () => {
    const filterButton = screen.getByRole('button', { name: /CAT/i });

    await user.click(filterButton);

    mockPortfolio.forEach((gallery) => {
      const itemTestId = `portfolio-item-${gallery.position}`;
      if (gallery.type === 'CAT') {
        expect(screen.getByTestId(itemTestId)).toBeInTheDocument();
      } else {
        expect(screen.queryByTestId(itemTestId)).not.toBeInTheDocument();
      }
    });
  });

  it('should Test that the "All" filter works', () => {
    const allFilterButton = screen.getByRole('button', { name: /All/i });
    fireEvent.click(allFilterButton);
  });

  it('Should submit all records regarding the portfolio.', () => {
    mockProfile.project.forEach((gallery: Gallery, index: number) => {
      const id: string = (++index).toString().padStart(2, '0');

      expect(screen.getByTestId('image-src_' + id)).toHaveAttribute('src', gallery.image);
      expect(screen.getByTestId('title_' + id)).toHaveTextContent(gallery.title);
      expect(screen.getByTestId('type_' + id)).toHaveTextContent(gallery.type);
      expect(screen.getByTestId('description_' + id)).toHaveTextContent(gallery.description);
      if (gallery.image) {
        expect(screen.queryByTestId('image_' + id)).toHaveAttribute('href', gallery.image);
      }
      if (gallery.video) {
        expect(screen.queryByTestId('video_' + id)).toHaveAttribute('href', gallery.video);
      }
      if (gallery.link) {
        expect(screen.getByTestId('link_' + id)).toHaveAttribute('href', gallery.link);
      }
    });
  });
});
/*
// Al principio de tu archivo .spec.ts
import * as fs from 'fs';
import * as path from 'path';

// ... tus otros imports (render, screen, etc.)

describe(PortfolioComponent.name, () => {
  // ... tu beforeEach ...

  it('I should filter by type', () => {
    const catFilterButton = screen.getByRole('button', { name: /CAT/i });
    fireEvent.click(catFilterButton);

    // =================================================================
    // AQUÍ ESTÁ LA LÍNEA MÁGICA (VERSIÓN AVANZADA)
    // =================================================================
    const htmlContent = screen.container.outerHTML;
    const filePath = path.join(__dirname, 'debug_output.html');
    fs.writeFileSync(filePath, htmlContent);
    // =================================================================

    // ... tus aserciones ...
  });
});
 */
