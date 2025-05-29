import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ServiceStateService } from '../services/service-state.service';
import { GalleryFormItems } from '../interfaces/galleryFormItems';

@Component({
  selector: 'app-gallery-items-dialog',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    AppIdDirective,
    MatInput,
    MatFormField,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
  ],
  templateUrl: './gallery-items-dialog.component.html',
  styleUrl: 'gallery-items-dialog.component.scss',
})
export class GalleryItemsDialogComponent implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private serviceStateService = inject(ServiceStateService);
  private dialogRef: MatDialogRef<GalleryItemsDialogComponent> = inject(MatDialogRef);
  galleryItemsForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.galleryItemsForm = this.formBuilder.group({
      position: [''],
      title: [''],
      description: [''],
      urlLink: [''],
      urlImage: [''],
      urlVideo: [''],
      type: [''],
    });
  }

  addGalleryItemsData(): void {
    if (this.galleryItemsForm.valid) {
      const galleryItems: GalleryFormItems = this.galleryItemsForm.value;

      this.serviceStateService.setServiceCommand(galleryItems);
      this.dialogRef.close(true);
    }
  }
}
