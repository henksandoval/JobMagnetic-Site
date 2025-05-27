import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { TestimonialBase } from '../interfaces/TestimonialBase';
import { TestimonialCommand } from '../interfaces/testimonialCommand';
import { CommandAdapter } from '../../../../adapters/command/command.adapter';
import { StateService } from '@core/services/state/state.service';
import { TestimonialStateService } from '../services/testimonial-state.service';

@Component({
  selector: 'app-dialog-testimonial',
  imports: [
    ReactiveFormsModule,
    AppIdDirective,
    MatInput,
    MatButton,
    MatDialogClose,
    MatDialogActions,
    MatLabel,
    MatFormField,
    MatDialogContent,
    CdkTextareaAutosize,
    MatDialogTitle,
  ],
  templateUrl: './dialog-testimonial.component.html',
  styleUrl: './dialog-testimonial.component.scss',
})
export class DialogTestimonialComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private stateService = inject(StateService);
  private testimonialStateService = inject(TestimonialStateService);
  private commandAdapter = inject(CommandAdapter);
  private dialogRef: MatDialogRef<DialogTestimonialComponent> = inject(MatDialogRef);
  testimonialsDialogForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.testimonialsDialogForm = this.formBuilder.group({
      profileId: [''],
      name: [''],
      jobTitle: [''],
      photoUrl: [''],
      feedback: [''],
    });
  }

  onAddTestimonials(): void {
    if (this.testimonialsDialogForm.valid) {
      const currentProfileId = this.stateService.tryGetProfileId();
      const testimonialBaseData: TestimonialBase = this.testimonialsDialogForm.value;

      const testimonialCommand = this.commandAdapter.transform<TestimonialBase, TestimonialCommand>(
        testimonialBaseData,
        'testimonialData',
        { profileId: currentProfileId }
      );

      this.testimonialStateService.setTestimonialCommand(testimonialCommand);
      this.dialogRef.close(true);
    }
  }
}
