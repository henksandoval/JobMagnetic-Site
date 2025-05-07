import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
  selector: 'app-summary-form',
  imports: [ReactiveFormsModule, AppIdDirective],
  templateUrl: './summary-form.component.html',
  styles: ``,
})
export class SummaryFormComponent implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  dataForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
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
}
