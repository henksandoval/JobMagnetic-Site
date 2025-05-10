import { ResumeFormComponent } from './resume-form.component';
import { render, screen } from '@testing-library/angular';
import translations from '../../../../../../../assets/i18n/messages.json';

describe(ResumeFormComponent.name, () => {
  let component: ResumeFormComponent;

  beforeEach(async () => {
    const { fixture } = await render(ResumeFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    component.ngOnInit();
    expect(component.dataForm).toBeDefined();
    expect(component.dataForm.controls['jobTitle']).toBeDefined();
    expect(component.dataForm.controls['about']).toBeDefined();
    expect(component.dataForm.controls['summary']).toBeDefined();
    expect(component.dataForm.controls['overview']).toBeDefined();
    expect(component.dataForm.controls['title']).toBeDefined();
    expect(component.dataForm.controls['suffix']).toBeDefined();
    expect(component.dataForm.controls['address']).toBeDefined();
  });
});
