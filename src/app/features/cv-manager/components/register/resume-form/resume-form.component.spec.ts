import { ResumeFormComponent } from './resume-form.component';
import { render } from '@testing-library/angular';
import { StateService } from '@core/services/state/state.service';
import { HttpService } from '@core/services/http/http.service';
import { ConfigService } from '@core/services/config/config.service';
import { Config } from '@core/services/config/interfaces/config';
import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

const apiUrl = 'https://api.example.com';
describe('ResumeFormComponentShould', () => {
  let component: ResumeFormComponent;
  let mockConfigService: Partial<ConfigService>;
  let mockStateService: Partial<StateService>;
  let mockHttpService: Partial<HttpService>;

  beforeEach(async () => {
    const config: Config = {
      useAPI: true,
      apiUrl: apiUrl,
    };

    mockConfigService = {
      getConfig: () => config,
    };

    mockStateService = {
      tryGetProfileId: () => '12345',
    };

    mockHttpService = {
      post: jest.fn().mockReturnValue(of({ success: true })),
    };

    const { fixture } = await render(ResumeFormComponent, {
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        { provide: HttpService, useValue: mockHttpService },
        { provide: StateService, useValue: mockStateService },
      ],
    });
    component = fixture.componentInstance;
  });

  it('instance correctly', () => {
    expect(component).toBeTruthy();
  });

  it('add new resume entry fakeAsync', fakeAsync(() => {
    component.dataForm.setValue({
      title: 'Senior Software Engineer',
      jobTitle: 'Lead Developer',
      about: 'Experienced software engineer with a focus on building scalable web applications.',
      summary: 'Over 10 years of experience in software development, specializing in full-stack engineering.',
      overview: 'Proficient in modern JavaScript frameworks, cloud services, and agile methodologies.',
      suffix: 'M.Sc.',
      address: '123 Tech Lane, Silicon Valley, CA, USA',
    });

    component.saveResumeData();

    tick();
    expect(mockHttpService.post).toHaveBeenCalledTimes(1);
  }));
});
