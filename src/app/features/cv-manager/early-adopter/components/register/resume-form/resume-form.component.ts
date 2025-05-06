import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resume-form',
  imports: [],
  templateUrl: './resume-form.component.html',
  styles: ``,
})
export class ResumeFormComponent implements OnInit {
  dataForm!: FormGroup;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
