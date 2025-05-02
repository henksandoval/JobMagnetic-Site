import { render, screen } from '@testing-library/angular';
import { PageScrollService } from 'ngx-page-scroll-core';
import { HeaderComponent } from './header.component';
import { MENU_SECTIONS, SCROLL_DELAY_MS } from './constants';
import { fakeAsync, tick } from '@angular/core/testing';

jest.useFakeTimers();

const mockPageScrollService = {
  scroll: jest.fn(),
};

describe(HeaderComponent.name, () => {
  beforeEach(async () => {
    await render(HeaderComponent, {
      providers: [{ provide: PageScrollService, useValue: mockPageScrollService }],
      inputs: {
        sections: MENU_SECTIONS,
      },
    });
  });

  it('should create the component', async () => {
    const component = await screen.findByTestId('header');
    expect(component).toBeTruthy();
  });

  it('should set an anchor by each section defined', fakeAsync(() => {
    MENU_SECTIONS.forEach((section) => {
      const anchor = screen.getByTestId(`a_${section.target}`);

      anchor.click();

      tick(SCROLL_DELAY_MS);

      expect(mockPageScrollService.scroll).toHaveBeenCalledWith({
        document: expect.anything(),
        scrollTarget: `#${section.target}`,
      });
    });
  }));

  it('should deactivate all sections and activate the clicked one', () => {
    MENU_SECTIONS.forEach((section) => {
      const anchor = screen.getByTestId(`a_${section.target}`);

      anchor.click();

      MENU_SECTIONS.forEach((sec) => {
        if (sec.target === section.target) {
          expect(sec.isActive).toBe(true);
        } else {
          expect(sec.isActive).toBe(false);
        }
      });
    });
  });
});
