import { Component } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import SurveyComponent from 'formiojs/components/survey/Survey';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'mat-formio-survey',
  template: `<table class="mat-elevation-z8 mat-table" fxFill>
    <thead>
      <tr class="mat-header-row">
        <th class="mat-header-cell"><h2>{{ instance.component.label }}</h2></th>
        <th class="mat-header-cell" *ngFor="let value of instance.component.values" style="text-align: center;">{{ value.label }}</th>
      </tr>
    </thead>
    <tbody>
    <tr class="mat-row" *ngFor="let question of instance.component.questions; index as i;">
      <td class="mat-cell">{{ question.label }}</td>
      <td class="mat-cell" *ngFor="let value of instance.component.values; index as j;" style="text-align: center;">
        <mat-radio-group (change)="onChange()" [formControl]="getFormControl(question.value)">
          <mat-radio-button [value]="value.value"></mat-radio-button>
        </mat-radio-group>
      </td>
    </tr>
    </tbody>
  </table>`
})
export class MaterialSurveyComponent extends MaterialComponent {
  public controls: any = {};
  getFormControl(question) {
    if (!this.controls[question]) {
      this.controls[question] = new FormControl();
    }
    return this.controls[question];
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
}
SurveyComponent.MaterialComponent = MaterialSurveyComponent;
export { SurveyComponent };
