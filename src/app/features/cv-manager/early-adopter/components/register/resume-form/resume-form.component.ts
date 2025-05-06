import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resume-form',
  imports: [],
  templateUrl: './resume-form.component.html',
  styles: ``,
})
export class ResumeFormComponent implements OnInit {
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
