import { Component } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import SurveyComponent from 'formiojs/components/survey/Survey.js';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'mat-formio-survey',
    template: `

      <mat-formio-form-field
              [instance]="instance"
              [componentTemplate]="componentTemplate"
              [showDescription]="false"
      ></mat-formio-form-field>
      <ng-template #componentTemplate let-hasLabel>

        <table class="mat-elevation-z8 mat-table" fxFill>
          <thead>
          <tr class="mat-header-row">
            <th class="mat-header-cell">
              <h2 *ngIf="hasLabel">
                <span [instance]="instance" matFormioLabel></span>
              </h2>
            </th>
            <th class="mat-header-cell"
                *ngFor="let value of instance.component.values"
                style="text-align: center;"
            >
              {{ value.label }}
            </th>
          </tr>
          </thead>

          <tbody>
          <tr class="mat-row" *ngFor="let question of instance.component.questions; index as i;">
            <td class="mat-cell">{{ question.label }}</td>
            <td class="mat-cell"
                *ngFor="let value of instance.component.values; index as j;"
                style="text-align: center;"
            >
              <mat-radio-group (change)="onChange()"
                               [formControl]="getFormControl(question.value)"
                               [name]="getUniqueName(question.value)"
              >
                <mat-radio-button [value]="value.value"></mat-radio-button>
              </mat-radio-group>
            </td>
          </tr>
          <mat-hint *ngIf="instance.component.description" class="mat-formio-component-description">
            {{ instance.component.description }}
          </mat-hint>
          </tbody>

          <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
        </table>
      </ng-template>
    `
})
export class MaterialSurveyComponent extends MaterialComponent {
  public controls: any = {};
  getFormControl(question) {
    if (!this.controls[question]) {
      this.controls[question] = new FormControl();
      if (this.instance.shouldDisabled) {
        this.controls[question].disable();
      }
    }
    return this.controls[question];
  }

  setDisabled(disabled) {
    const method = disabled ? 'disable' : 'enable';
    for (const question in this.controls) {
      if (this.controls.hasOwnProperty(question)) {
        this.controls[question][method]();
      }
    }
  }

  getValue() {
    const values = {};
    for (const question in this.controls) {
      if (this.controls.hasOwnProperty(question)) {
        values[question] = this.controls[question].value || false;
      }
    }
    return values;
  }

  setValue(value) {
    for (const question in value) {
      if (value.hasOwnProperty(question)) {
        const control = this.getFormControl(question);
        if (control) {
          control.setValue(value[question] || false);
        }
      }
    }
  }

  getUniqueName(question) {
    return `${this.instance.id}-${question}`;
  }
}
SurveyComponent.MaterialComponent = MaterialSurveyComponent;
export { SurveyComponent };
