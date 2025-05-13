import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { ServiceCreateCommand } from '../models/serviceFormData.model';
import { ServiceFormBaseModel } from '../models/serviceFormBase.model';
import { CommonModule, NgIf } from '@angular/common';
import { GalleryFormItems } from '../models/galleryFormItems.model';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { RegisterComponent } from '../register.component';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-service-form',
  imports: [ReactiveFormsModule, AppIdDirective, NgIf, CommonModule],
  templateUrl: 'service-form.component.html',
  styles: ``,
})
export class ServiceFormComponent implements OnInit {
  private readonly profileService: ProfileService = inject(ProfileService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly registerComponent: RegisterComponent = inject(RegisterComponent);
  profileId = this.registerComponent.profileIdSignal;
  serviceDataForm!: FormGroup;
  serviceItems: GalleryFormItems[] = [];
  itemsOverview: ServiceFormBaseModel | undefined;

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
    debugger

    const urlEndpoint = ApiEndpoints.profile.service;
    const formData: ServiceFormBaseModel = this.serviceDataForm.value;
    const createService = this.transformFormDataService(formData);
    this.profileService.saveData(urlEndpoint, createService).subscribe();
  }

  private transformFormDataService(formData: ServiceFormBaseModel): ServiceCreateCommand {
    return {
      serviceBase: {
        profileId: formData.profileId,
        Overview: formData.Overview,
        galleryItems: formData.galleryItems.filter((item) => ({
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
        profileId: 'example-profile-id',
        Overview: newServiceItem.overview,
        galleryItems: [],
      };
    } else {
      this.itemsOverview.Overview = newServiceItem.overview;
    }
    this.serviceItems.push(newServiceItem);
    this.serviceDataForm.reset();
  }
}
