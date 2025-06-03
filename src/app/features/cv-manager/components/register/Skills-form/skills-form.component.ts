import { Component, effect, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Config } from '@core/services/config/interfaces/config';
import { ConfigService } from '@core/services/config/config.service';
import { StateService } from '@core/services/state/state.service';
import { HttpService } from '@core/services/http/http.service';
import { CommandAdapter } from '../../../adapters/command/command.adapter';
import { SkillCommand } from './interfaces/skillCommand';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SkillItemBase } from './interfaces/SkillItemBase';
import { DialogSkillItemComponent } from './dialog-skill-item/dialog-skill-item.component';
import { SkillStateService } from './services/skill-state.service';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { SkillData } from './interfaces/skillBase';

@Component({
  selector: 'app-skills-form',
  imports: [
    AppIdDirective,
    MatGridList,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    NgIf,
    MatGridTile,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    CdkTextareaAutosize,
  ],
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss',
})
export class SkillsFormComponent implements OnInit {
  private readonly configService: Config = inject(ConfigService).getConfig();
  private readonly stateService: StateService = inject(StateService);
  private readonly httpService: HttpService = inject(HttpService);
  private readonly skillStateService: SkillStateService = inject(SkillStateService);
  private skillItemBaseSignal: WritableSignal<SkillItemBase[]> = signal([]);
  public readonly skillItemBaseArray: Signal<SkillItemBase[]> = this.skillItemBaseSignal.asReadonly();
  private readonly SKILLS_URL_ENDPOINT = new URL(ApiEndpoints.profile.skillSet, this.configService.apiUrl);
  private commandAdapter = inject(CommandAdapter);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialog: MatDialog = inject(MatDialog);
  dataForm!: FormGroup;
  isSaving = false;

  constructor() {
    this.subscribeToSkills();
  }

  private subscribeToSkills() {
    effect(() => {
      const receivedSkills = this.skillStateService.skillItemBase();
      if (receivedSkills) {
        this.skillItemBaseSignal.update((currentArray) => [...currentArray, receivedSkills]);
        const skillItemArray = this.dataForm.get('skillDetails') as FormArray;
        const newSkillItemGroup = this.createSkillItemFormGroup(receivedSkills);
        skillItemArray.push(newSkillItemGroup);
        this.skillStateService.clearSkillItemBase();
      }
    });
  }

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.dataForm = this.formBuilder.group({
      profileId: [''],
      overview: ['', [Validators.required]],
      skillDetails: this.formBuilder.array([]),
    });
  }

  openSkillsDialog(): void {
    this.dialog.open(DialogSkillItemComponent, {
      width: '800px',
      disableClose: true,
    });
  }

  saveSkills(): void {
    if (this.isSaving) {
      return;
    }
    this.isSaving = true;
    const currentProfileId = this.stateService.tryGetProfileId();
    if (!currentProfileId) {
      this.isSaving = false;
      return;
    }

    const skillData: SkillData = this.dataForm.value;
    const skillsCommand = this.commandAdapter.transform<SkillData, SkillCommand>(skillData, 'SkillBase', {
      profileId: currentProfileId,
    });
    this.httpService
      .post(this.SKILLS_URL_ENDPOINT, skillsCommand)
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
  }

  private createSkillItemFormGroup(skillsItem: SkillItemBase): FormGroup {
    return this.formBuilder.group({
      id: [skillsItem.id],
      proficiencyLevel: [skillsItem.proficiencyLevel],
      rank: [skillsItem.rank],
      name: [skillsItem.name],
      category: [skillsItem.category],
      iconUrl: [skillsItem.iconUrl],
    });
  }
}
