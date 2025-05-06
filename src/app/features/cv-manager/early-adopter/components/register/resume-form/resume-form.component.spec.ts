import { ResumeFormComponent } from './resume-form.component';
import { render } from '@testing-library/angular';

describe(ResumeFormComponent.name, () => {
  let component: ResumeFormComponent;

  beforeEach(async () => {
    const { fixture } = await render(ResumeFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
