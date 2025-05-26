import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { CommonModule } from '@angular/common';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { ServiceCommand } from '../models/serviceCommand.model';
import { ServiceBase } from '../models/serviceBase.model';
import { StateService } from '@core/services/state/state.service';
import {
  MatDialog,
} from '@angular/material/dialog';
import { HttpService } from '@core/services/http/http.service';
import { CommandAdapter } from '../../../adapters/command/command.adapter';
import { GalleryFormItems } from '../models/galleryFormItems.model';
import { GalleryItemsDialogComponent } from './gallery-items-dialog/gallery-items-dialog.component';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { Config } from '@core/services/config/interfaces/config';
import { ConfigService } from '@core/services/config/config.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-service-form',
  imports: [
    ReactiveFormsModule,
    AppIdDirective,
    CommonModule,
    MatCardContent,
    MatLabel,
    MatButton,
    MatIcon,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatAccordion,
    MatInput,
    MatFormField,
    MatCard,
    CdkTextareaAutosize,
    MatProgressSpinner
  ],
  templateUrl: 'service-form.component.html',
  styleUrl: 'service-form.component.scss',
})
export class ServiceFormComponent implements OnInit {
  private readonly configService: Config = inject(ConfigService).getConfig();
  private readonly httpService: HttpService = inject(HttpService);
  private readonly stateService: StateService = inject(StateService);
  private readonly commandAdapter: CommandAdapter = inject(CommandAdapter);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private galleryItemsSignal: WritableSignal<GalleryFormItems[]> = signal([]);
  public readonly galleryItemsArray: Signal<GalleryFormItems[]> = this.galleryItemsSignal.asReadonly();
  private readonly SERVICE_URL_ENDPOINT = new URL(ApiEndpoints.profile.service, this.configService.apiUrl);
  private dialog: MatDialog = inject(MatDialog);
  formData!: FormGroup;
  isSaving = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formData = this.formBuilder.group({
      overview: ['', [Validators.required]],
      galleryItems: this.formBuilder.array([]),
    });
  }

  addGalleryItem(): void {
    const dialogRef = this.dialog.open(GalleryItemsDialogComponent, {
      width: '800px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: GalleryFormItems | null) => {
      if (result) {
        this.galleryItemsSignal.update((items) => [...items, result]);
        const educationFA = this.formData.get('galleryItems') as FormArray;
        educationFA.push(this.createGalleryItemsFormGroup(result));
      }
    });
  }

  saveServiceData(): void {
    debugger;
    if (this.isSaving) {
      return;
    }
    this.isSaving = true;
    const currentProfileId = this.stateService.tryGetProfileId();
    if (!currentProfileId) {
      this.isSaving = false;
      return;
    }
    if (this.formData.valid) {
      const serviceData: ServiceBase = this.formData.value;
      const createService = this.commandAdapter.transform<ServiceBase, ServiceCommand>(
        serviceData,
        'serviceData',
        { profileId: currentProfileId }
      );
      this.httpService
        .post(this.SERVICE_URL_ENDPOINT, createService)
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

  private createGalleryItemsFormGroup(galleryItems: GalleryFormItems): FormGroup {
    return this.formBuilder.group({
      position: [galleryItems.position],
      title: [galleryItems.title, Validators.required],
      description: [galleryItems.description, Validators.required],
      urlLink: [galleryItems.urlLink],
      urlImage: [galleryItems.urlImage, Validators.required],
      urlVideo: [galleryItems.urlVideo],
      type: [galleryItems.type, Validators.required],
    });
  }
}
