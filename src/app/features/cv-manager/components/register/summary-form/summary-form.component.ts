import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { DatePipe, NgIf } from '@angular/common';
import { Education } from './interfaces/education';
import { Guid } from 'guid-typescript';
import { WorkExperience } from './interfaces/work-experience';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { EducationDialogComponent } from './education-dialog/education-dialog.component';
import { WorkExperienceDialogComponent } from './work-experience-dialog/work-experience-dialog.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { SummaryBase } from './interfaces/summaryBase';
import { SummaryCommand } from './interfaces/summaryCommand';
import { StateService } from '@core/services/state/state.service';
import { CommandAdapter } from '../../../adapters/command/command.adapter';
import { Config } from '@core/services/config/interfaces/config';
import { ConfigService } from '@core/services/config/config.service';
import { HttpService } from '@core/services/http/http.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-summary-form',
  imports: [
    ReactiveFormsModule,
    AppIdDirective,
    DatePipe,
    NgIf,
    MatIcon,
    MatButton,
    MatCardContent,
    MatCardActions,
    MatCard,
    MatLabel,
    MatFormField,
    MatInput,
    MatIconButton,
    MatProgressSpinner,
  ],
  templateUrl: './summary-form.component.html',
  styleUrl: './summary-form.component.scss',
})
export class SummaryFormComponent implements OnInit {
  private readonly configService: Config = inject(ConfigService).getConfig();
  private readonly stateService: StateService = inject(StateService);
  private readonly httpService: HttpService = inject(HttpService);
  private readonly commandAdapter: CommandAdapter = inject(CommandAdapter);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialog: MatDialog = inject(MatDialog);
  dataForm!: FormGroup;
  private educationSignal: WritableSignal<Education[]> = signal([]);
  public readonly educationArray: Signal<Education[]> = this.educationSignal.asReadonly();
  private workExperienceSignal: WritableSignal<WorkExperience[]> = signal([]);
  public readonly workExperienceArray: Signal<WorkExperience[]> = this.workExperienceSignal.asReadonly();
  private readonly SUMMARY_URL_ENDPOINT = new URL(ApiEndpoints.profile.summary, this.configService.apiUrl);
  isSaving = false;

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.dataForm = this.formBuilder.group({
      introduction: ['', [Validators.required]],
      education: this.formBuilder.array([]),
      workExperiences: this.formBuilder.array([]),
    });
  }

  getButtonAppId(prefix: string, correlationId: Guid): string {
    return `${prefix}_${correlationId}`;
  }

  openEducationDialog(): void {
    const dialogRef = this.dialog.open(EducationDialogComponent, {
      width: '800px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: Education | null) => {
      if (result) {
        this.educationSignal.update((currentArray) => [...currentArray, result]);

        const educationFA = this.dataForm.get('education') as FormArray;
        educationFA.push(this.createEducationFormGroup(result));
      }
    });
  }

  private createEducationFormGroup(education: Education): FormGroup {
    return this.formBuilder.group({
      correlationId: [education.correlationId],
      degree: [education.degree, Validators.required],
      institutionName: [education.institutionName, Validators.required],
      institutionLocation: [education.institutionLocation, Validators.required],
      description: [education.description],
      startDate: [education.startDate, Validators.required],
      endDate: [education.endDate],
    });
  }

  openWorkExperienceDialog(): void {
    const dialogRef = this.dialog.open(WorkExperienceDialogComponent, {
      width: '800px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: WorkExperience) => {
      if (result) {
        this.workExperienceSignal.update((currentArray) => [...currentArray, result]);
        const workFA = this.dataForm.get('workExperiences') as FormArray;
        workFA.push(this.createWorkExperienceFormGroup(result));
      }
    });
  }

  private createWorkExperienceFormGroup(work: WorkExperience): FormGroup {
    return this.formBuilder.group({
      correlationId: [work.correlationId],
      jobTitle: [work.jobTitle, Validators.required],
      companyName: [work.companyName, Validators.required],
      companyLocation: [work.companyLocation, Validators.required],
      description: [work.description],
      responsibilities: [work.responsibilities],
      startDate: [work.startDate, Validators.required],
      endDate: [work.endDate],
    });
  }

  removeEducation(correlationIdToRemove: Guid): void {
    this.educationSignal.update((currentArray) =>
      currentArray.filter((edu) => edu.correlationId !== correlationIdToRemove)
    );
  }

  removeWorkExperience(correlationId: Guid): void {
    this.workExperienceSignal.update((currentArray) =>
      currentArray.filter((work) => work.correlationId !== correlationId)
    );
  }

  saveData(): void {
    if (this.isSaving) {
      return;
    }
    this.isSaving = true;
    const currentProfileId = this.stateService.tryGetProfileId();
    if (!currentProfileId) {
      this.isSaving = false;
      return;
    }
    if (this.dataForm.valid) {
      const summaryData: SummaryBase = this.dataForm.value;
      const createSummary = this.commandAdapter.transform<SummaryBase, SummaryCommand>(
        summaryData,
        'summaryData',
        { profileId: currentProfileId }
      );
      this.httpService
        .post(this.SUMMARY_URL_ENDPOINT, createSummary)
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
    } else {
      console.log('Form is invalid');
    }
  }
}
