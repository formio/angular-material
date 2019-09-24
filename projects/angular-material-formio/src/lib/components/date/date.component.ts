import { Component } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import DateTimeComponent from 'formiojs/components/datetime/DateTime.js';
import { momentDate } from 'formiojs/utils/utils.js';
const ISO_8601_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';
@Component({
  selector: 'mat-formio-date',
  template: `
    <mat-form-field fxFill>
      <mat-datepicker-toggle matPrefix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      <mat-label>{{ instance.component.label }}</mat-label>
      <input matInput
           [matDatepicker]="picker"
           [placeholder]="instance.component.placeholder"
           [formControl]="control">
      <mat-icon *ngIf="instance.component.tooltip" matSuffix matTooltip="{{ instance.component.tooltip }}">info</mat-icon>
      <mat-hint *ngIf="instance.component.description">{{ instance.component.description }}</mat-hint>
    </mat-form-field>
  `
})
export class MaterialDateComponent extends MaterialComponent {
  onChange() {
    const valueFormat = this.instance.widget.settings.dateFormat || ISO_8601_FORMAT;
    let dateValue = momentDate(this.control.value, valueFormat, this.instance.widget.timezone).toDate();
    dateValue = this.instance.widget.getDateValue(dateValue, valueFormat);
    this.instance.updateValue({modified: true}, dateValue);
  }
}
DateTimeComponent.MaterialComponent = MaterialDateComponent;
export { DateTimeComponent };
