import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { NgIf } from '@angular/common';
import { ResumeCommand } from '../models/resumeCommand.model';
import { ResumeCommandBase } from '../models/resumeData.model';
import { CommandAdapter } from '../../../adapters/command/command.adapter';
import { StateService } from '@core/services/state/state.service';
import { HttpService } from '@core/services/http/http.service';
import { Config } from '@core/services/config/interfaces/config';
import { ConfigService } from '@core/services/config/config.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-resume-form',
  imports: [
    ReactiveFormsModule,
    AppIdDirective,
    NgIf,
    MatProgressSpinner,
    MatButton,
    MatInput,
    MatLabel,
    MatFormField,
  ],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.scss',
})
export class ResumeFormComponent implements OnInit {
  private readonly configService: Config = inject(ConfigService).getConfig();
  private readonly stateService: StateService = inject(StateService);
  private readonly httpService: HttpService = inject(HttpService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly commandAdapter: CommandAdapter = inject(CommandAdapter);
  private readonly RESUME_URL_ENDPOINT = new URL(ApiEndpoints.profile.about, this.configService.apiUrl);
  dataForm!: FormGroup;
  isSaving = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  saveResumeData(): void {
    if (this.isSaving) {
      return;
    }

    if (this.dataForm.invalid) {
      return;
    }

    const resumeCommandBase: ResumeCommandBase = this.dataForm.value;
    const createResume = this.commandAdapter.transform<ResumeCommandBase, ResumeCommand>(
      resumeCommandBase,
      'resumeData',
      { profileId: this.stateService.tryGetProfileId() }
    );

    this.httpService
      .post(this.RESUME_URL_ENDPOINT, createResume)
      .pipe(
        tap(() => {
          this.isSaving = true;
        }),
        catchError((error) => {
          console.error(error);
          return EMPTY;
        }),
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe();
  }

  private initializeForm(): void {
    this.dataForm = this.formBuilder.group({
      jobTitle: [''],
      about: [''],
      summary: [''],
      overview: [''],
      title: [''],
      suffix: [''],
      address: [''],
    });
  }

  private getUrlEndpoint(): URL {
    debugger
    return new URL(ApiEndpoints.profile.about, this.configService.apiUrl);
  }
}
