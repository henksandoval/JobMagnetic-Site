import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { ServiceCreateCommand } from '../models/serviceFormData.model';
import { ServiceFormBaseModel } from '../models/serviceFormBase.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-service-form',
  imports: [ReactiveFormsModule, AppIdDirective, NgIf],
  templateUrl: 'service-form.component.html',
  styles: ``,
})
export class ServiceFormComponent implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  serviceDataForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.serviceDataForm = this.formBuilder.group({
      overview: [''],
      position: [''],
      title: [''],
      description: [''],
      urlLink: [''],
      urlImage: [''],
      urlVideo: [''],
      type: [''],
    });
  }

  saveServiceData(): void {
  }

  private transformFormDataService(formData: ServiceFormBaseModel, profileId: string): ServiceCreateCommand {
    return {
      serviceBase: {
        profileId: profileId,
        Overview: formData.Overview,
        galleryItems: formData.galleryItems.map((item) => ({
          position: item.position,
          title: item.title,
          description: item.description,
          urlLink: item.urlLink,
          urlImage: item.urlImage,
          urlVideo: item.urlVideo,
          type: item.type,
        })),
      },
    };
  }
}
