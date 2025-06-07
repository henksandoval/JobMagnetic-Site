import { Component, inject, OnInit } from '@angular/core';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SkillItemBase } from '../interfaces/SkillItemBase';
import { SkillStateService } from '../services/skill-state.service';

@Component({
  selector: 'app-dialog-skill-item',
  imports: [
    AppIdDirective,
    MatButton,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog-skill-item.component.html',
  styleUrl: './dialog-skill-item.component.scss',
})
export class DialogSkillItemComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private readonly skillStateService: SkillStateService = inject(SkillStateService);
  private dialogRef = inject(MatDialogRef<DialogSkillItemComponent>);
  skillItemDialogForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.skillItemDialogForm = this.formBuilder.group({
      id: [''],
      proficiencyLevel: [''],
      rank: [''],
      name: [''],
      category: [''],
      iconUrl: [''],
    });
  }

  onAddSkillItem(): void {
    if (this.skillItemDialogForm.valid) {
      const skillItemData: SkillItemBase = this.skillItemDialogForm.value;
      this.skillStateService.setSkillItemBase(skillItemData);
      this.dialogRef.close(true);
    }
  }
}
