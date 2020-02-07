import {Component, NgModule} from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import DateTimeComponent from 'formiojs/components/datetime/DateTime.js';
import { momentDate } from 'formiojs/utils/utils.js';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'mat-formio-date',
  template: `
      <form class="example-form">
        <mat-datepicker-toggle (click)="toggleCalendar()"></mat-datepicker-toggle>
        <mat-form-field class="example-full-width">
          <input
            *ngIf="instance.component.enableTime && instance.component.enableDate !== false"
            matInput
            type="datetime-local"
            [placeholder]="instance.component.placeholder"
            [formControl]="control"
            (input)="onChange()"
          >
          <input
            *ngIf="!instance.component.enableTime && instance.component.enableDate !== false"
            matInput
            [placeholder]="instance.component.placeholder"
            [formControl]="control"
            (input)="onChange()"
          >
        </mat-form-field>
          <mat-formio-calendar
            [minDate]="instance.component.minDate || ''"
            [maxDate]="instance.component.maxDate || ''"
            [dateFilter]="instance.component.dateFlter || dateFilter"
            [hidden]="!isPickerOpened"
            (dateSelectEvent)="onChangeDate($event)"
            (timeSelectEvent)="onChangeTime($event)"
            [enableDate]="instance.component.enableDate"
            [enableTime]="instance.component.enableTime"
          ></mat-formio-calendar>
          <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
      </form>
  `
})

export class MaterialDateComponent extends MaterialComponent {
  public timeControl: FormControl = new FormControl();
  public isPickerOpened: boolean;
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

  disableWeekends(d: Date) {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  disableDates(dates: Array<string>, d: Date) {
    const formattedDates = dates.map((date) => momentDate(date).format('YYYY-MM-DD'));
    return !formattedDates.includes(momentDate(d).format('YYYY-MM-DD'));
  }

  dateFilter = (d: Date | null): boolean => {
    const isValid = this.instance.component.disableWeekends ? this.disableWeekends(d) : true;
    return this.instance.component.disabledDates && isValid ?
      this.disableDates(this.instance.component.disabledDates, d) : isValid;
  }
}
DateTimeComponent.MaterialComponent = MaterialDateComponent;
export { DateTimeComponent };
