import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialComponent } from '../MaterialComponent';
import DayComponent from 'formiojs/components/day/Day.js';
import { momentDate } from 'formiojs/utils/utils.js';
DayComponent.prototype.getFieldValue = function(name) {
  return this.refs[name] ? this.refs[name].value : '';
};

@Component({
  selector: 'mat-formio-day',
  template: `
    <mat-formio-form-field [instance]="instance" [componentTemplate]="componentTemplate"></mat-formio-form-field>
    <ng-template #componentTemplate let-hasLabel>
      <mat-label *ngIf="hasLabel">
        <span [instance]="instance" matFormioLabel></span>
      </mat-label>
      <mat-form-field *ngIf="instance.dayFirst && instance.showDay">
        <mat-label *ngIf="!instance.component.hideInputLabels">Day</mat-label>
        <mat-select [formControl]="dayControl" (selectionChange)="onChange()" [required]="instance.dayRequired">
          <mat-option *ngFor="let day of instance.days" [value]="day.value">
            {{day.label}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field *ngIf="instance.showMonth">
        <mat-label *ngIf="!instance.component.hideInputLabels">Month</mat-label>
        <mat-select [formControl]="monthControl" (selectionChange)="onChange()" [required]="instance.monthRequired">
          <mat-option *ngFor="let month of instance.months" [value]="month.value">
            {{month.label}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field *ngIf="!instance.dayFirst && instance.showDay">
        <mat-label *ngIf="!instance.component.hideInputLabels">Day</mat-label>
        <mat-select [formControl]="dayControl" (selectionChange)="onChange()" [required]="instance.dayRequired">
          <mat-option *ngFor="let day of instance.days" [value]="day.value">
            {{day.label}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field *ngIf="instance.showYear">
        <mat-label *ngIf="!instance.component.hideInputLabels">Year</mat-label>
        <mat-select [formControl]="yearControl" (selectionChange)="onChange()" [required]="instance.yearRequired">
          <mat-option *ngFor="let year of instance.years" [value]="year.value">
            {{year.label}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
    </ng-template>
  `
})
export class MaterialDayComponent extends MaterialComponent {
  public dayControl: FormControl = new FormControl();
  public monthControl: FormControl = new FormControl();
  public yearControl: FormControl = new FormControl();
  setInstance(instance) {
    // Add stub methods to match dom elements.
    (this.dayControl as any).setAttribute = () => {};
    (this.dayControl as any).removeAttribute = () => {};
    (this.monthControl as any).setAttribute = () => {};
    (this.monthControl as any).removeAttribute = () => {};
    (this.yearControl as any).setAttribute = () => {};
    (this.yearControl as any).removeAttribute = () => {};
    instance.refs = {
      day: this.dayControl,
      month: this.monthControl,
      year: this.yearControl
    };
    return super.setInstance(instance);
  }

  setDisabled(disabled) {
    if (disabled) {
      this.dayControl.disable();
      this.monthControl.disable();
      this.yearControl.disable();
    } else {
      this.dayControl.enable();
      this.monthControl.enable();
      this.yearControl.enable();
    }
  }

  getValue() {
    return this.instance.getDate();
  }

  setValue(value) {
    if (value) {
      this.dayControl.setValue(parseInt(momentDate(value).format('D')));
      this.monthControl.setValue(parseInt(momentDate(value).format('M')));
      this.yearControl.setValue(parseInt(momentDate(value).format('YYYY')));
    }
    this.instance.setValueAt(0, value);
  }
}
DayComponent.MaterialComponent = MaterialDayComponent;
export { DayComponent };
