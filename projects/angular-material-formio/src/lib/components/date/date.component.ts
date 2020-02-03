import {Component, NgModule} from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import DateTimeComponent from 'formiojs/components/datetime/DateTime.js';
import { momentDate } from 'formiojs/utils/utils.js';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'mat-formio-date',
  template: `
      <mat-label fxFill>{{ instance.component.label }}</mat-label>
      <form class="example-form">
          <mat-datepicker-toggle (click)="toggleCalendar()"></mat-datepicker-toggle>
        <mat-form-field class="example-full-width">
          <input 
            *ngIf="instance.component.enableTime && instance.component.enableDate !== false"      
            matInput
            type="datetime-local"
            [placeholder]="instance.component.placeholder"
            [formControl]="control"
          >
          <input
            *ngIf="!instance.component.enableTime && instance.component.enableDate !== false"
            matInput
            [placeholder]="instance.component.placeholder"
            [formControl]="control"
          >
        </mat-form-field>
          <mat-formio-calendar 
            [hidden]="!isPickerOpened" 
            (dateSelectEvent)="onChangeDate($event)" 
            (timeSelectEvent)="onChangeTime($event)"
            [enableDate]="instance.component.enableDate"
            [enableTime]="instance.component.enableTime"
          ></mat-formio-calendar>
      </form>
      <mat-hint *ngIf="instance.component.description">{{ instance.component.description }}</mat-hint>
  `
})

export class MaterialDateComponent extends MaterialComponent {
  public timeControl: FormControl = new FormControl();
  public isPickerOpened: Boolean;
  public selectedDate: any;
  public selectedTime: any = '00:00';

  onChangeDate(event) {
    this.selectedDate = momentDate(event).format('YYYY-MM-DD');
    this.control.setValue(this.selectedDate);
    this.setDateTime();
  }

  onChangeTime(time) {
    this.selectedTime = time;
    if (this.selectedDate) {
      this.setDateTime();
    }
  }

  setDateTime() {
    this.instance.component.enableTime ? this.control.setValue(`${this.selectedDate}T${this.selectedTime}`) :
      this.control.setValue(this.selectedDate);
    this.onChange();
  }

  setInstance(instance: any) {
    super.setInstance(instance);
  }

  toggleCalendar() {
    this.isPickerOpened = !this.isPickerOpened;
  }

  getDate() {
    return momentDate(this.control).format('YYYY-MM-DD');
  }

  getTime() {
    return momentDate(this.control).format('HH.mm');
  }

  setValue(value) {
    super.setValue(value);
  }

}
DateTimeComponent.MaterialComponent = MaterialDateComponent;
export { DateTimeComponent };
