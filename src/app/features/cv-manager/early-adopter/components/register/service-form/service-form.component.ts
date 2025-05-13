import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { ServiceCreateCommand } from '../models/serviceFormData.model';
import { ServiceFormBaseModel } from '../models/serviceFormBase.model';
import { CommonModule } from '@angular/common';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { RegisterComponent } from '../register.component';
import { ProfileService } from '../../../services/profile.service';
import { GalleryFormItems } from '../models/galleryFormItems.model';

@Component({
  selector: 'app-service-form',
  imports: [ReactiveFormsModule, AppIdDirective, CommonModule],
  templateUrl: 'service-form.component.html',
  styles: ``,
})
export class ServiceFormComponent implements OnInit {
  private readonly profileService: ProfileService = inject(ProfileService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly registerComponent: RegisterComponent = inject(RegisterComponent);
  profileId = this.registerComponent.profileIdSignal;
  formData!: FormGroup;
  serviceDataForm!: FormGroup;
  itemsOverview: ServiceFormBaseModel | undefined;
  galleryItemsArray: GalleryFormItems[] = [];

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formData = this.formBuilder.group({
      overview: [''],
      galleryItems: this.formBuilder.array([]),
    });

    this.serviceDataForm = this.formBuilder.group({
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
    const urlEndpoint = ApiEndpoints.profile.service;
    const formData: ServiceFormBaseModel = {
      profileId: '',
      Overview: this.formData.value.overview,
      galleryItems: this.itemsOverview!.galleryItems,
    };

    const createService = this.transformFormDataService(formData);
    this.profileService.saveData(urlEndpoint, createService).subscribe();
  }

  private transformFormDataService(formData: ServiceFormBaseModel): ServiceCreateCommand {
    return {
      serviceBase: {
        profileId: formData.profileId,
        Overview: formData.Overview,
        galleryItems: (formData.galleryItems || []).map((item) => ({
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

  addServiceData(): void {
    const newServiceItem = this.serviceDataForm.value;
    if (!this.itemsOverview) {
      this.itemsOverview = {
        profileId: '',
        Overview: this.formData.value.overview,
        galleryItems: [],
      };
    }
    this.itemsOverview?.galleryItems.push(newServiceItem);
    this.serviceDataForm.reset();
  }
}
