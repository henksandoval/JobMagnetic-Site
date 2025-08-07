import { render } from '@testing-library/angular';
import { IndexComponent } from './index.component';

describe(IndexComponent.name, () => {
  beforeEach(async () => {
    await render(IndexComponent);
  });

  it('should create the component', () => {
    expect(IndexComponent).toBeTruthy();
  });
});
