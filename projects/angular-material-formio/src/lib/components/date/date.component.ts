import { Component, NgModule, ViewChild } from '@angular/core'
import { MaterialComponent } from '../MaterialComponent';
import DateTimeComponent from 'formiojs/components/datetime/DateTime.js';
import { momentDate } from 'formiojs/utils/utils.js';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'mat-formio-date',
  host: {
    '(document:click)': 'clickOutside($event)',
  },
  template: `
    <mat-formio-form-field [instance]="instance" [componentTemplate]="componentTemplate"></mat-formio-form-field>
    <ng-template #componentTemplate let-hasLabel>
      <mat-label *ngIf="hasLabel" fxFill>
        <span [instance]="instance" matFormioLabel></span>
      </mat-label>

      <form class="example-form">
        <mat-datepicker-toggle [disabled]="isDisabled()" (click)="toggleCalendar($event)">
          <mat-icon matDatepickerToggleIcon *ngIf="enableTime && !enableDate">schedule</mat-icon>
        </mat-datepicker-toggle>
        <mat-form-field class="example-full-width">
          <input
                  *ngIf="enableTime && enableDate"
                  matInput
                  type="datetime-local"
                  [placeholder]="instance.component.placeholder"
                  [formControl]="control"
                  (input)="onChange()"
                  readonly
          >
          <input
                  *ngIf="enableTime && !enableDate"
                  matInput
                  [placeholder]="instance.component.placeholder"
                  [formControl]="control"
                  [matMask]="formatTime"
                  (input)="onChange()"
                  readonly
          >
          <input
                  *ngIf="!enableTime && enableDate"
                  matInput
                  [placeholder]="instance.component.placeholder"
                  [formControl]="control"
                  (input)="onChange()"
                  readonly
          >
        </mat-form-field>

        <mat-formio-calendar
                #calendar
                [minDate]="instance.component.datePicker.minDate || ''"
                [maxDate]="instance.component.datePicker.maxDate || ''"
                [dateFilter]="dateFilter"
                [hidden]="!isPickerOpened"
                (dateSelectEvent)="onChangeDate($event)"
                (timeSelectEvent)="onChangeTime($event)"
                [enableDate]="enableDate"
                [enableTime]="enableTime"
                [hourStep]="instance.component.timePicker.hourStep"
                [minuteStep]="instance.component.timePicker.minuteStep"
        ></mat-formio-calendar>
        <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
      </form>
    </ng-template>
  `
})

export class MaterialDateComponent extends MaterialComponent {
  public timeControl: FormControl = new FormControl();
  public isPickerOpened: boolean;
  public selectedDate: any;
  public selectedTime: any = '00:00';

  @ViewChild('calendar', {static: false}) calendar;

  get enableDate() {
    return this.instance && this.instance.component.enableDate !== false;
  }

  get enableTime() {
    return this.instance && this.instance.component.enableTime === true;
  }

  onChangeDate(event) {
    this.selectedDate = momentDate(event).format('YYYY-MM-DD');
    this.control.setValue(this.selectedDate);
    this.setDateTime();
  }

  onChangeTime(time) {
    this.selectedTime = time;
    if (this.selectedDate || (this.enableTime && !this.enableDate)) {
      this.setDateTime();
    }
  }

  getDateTimeValue() {
    if (this.enableTime && this.enableDate) {
      return `${this.selectedDate}T${this.selectedTime}`;
    }
    if (!this.enableTime && this.enableDate) {
      return this.selectedDate;
    }
    if (this.enableTime && !this.enableDate) {
      const today = momentDate(new Date()).format('YYYY-MM-DD');
      return `${today}T${this.selectedTime}`;
    }
  }

  setDateTime() {
    this.control.setValue(this.getDateTimeValue());
    this.onChange();
  }

  setInstance(instance: any) {
    super.setInstance(instance);
    this.isDisabled() ? this.control.disable() : this.control.enable();

    if (this.instance) {
      if (this.instance.component && this.instance.component.datePicker) {
       const {minDate: min, maxDate: max} = this.instance.component.datePicker;

       // It improves the date to the full format if the customer set only a year. Otherwise we will have conflicts into the moment.js.
       const { minDate, maxDate } = this.improveMinMaxDate(min, max);
       this.instance.component.datePicker.minDate = minDate;
       this.instance.component.datePicker.maxDate = maxDate;
      }
     }
  }

  toggleCalendar(event) {
    if (!this.isDisabled()) {
      this.isPickerOpened = !this.isPickerOpened;
      event.stopPropagation();
    }
  }

  isDisabled() {
    const { readonly, disabled } = this.instance.component;
    return readonly || disabled || this.instance.root.options.readOnly
  }

  public formatTime = (value) => {
    if (!value) {
      return this.instance.emptyValue;
    }
    return momentDate(value).format(this.instance.component.format);
  }

  setValue(value) {
    if (this.dateFilter(value) && this.checkMinMax(value)) {
      if (value) {
        const format = `YYYY-MM-DD${this.enableTime ? 'THH:mm' : ''}`;
        value = momentDate(value).format(format)
       }
      super.setValue(value);
    }
  }

  onChange() {
    const value = this.dateFilter(this.getValue()) && this.checkMinMax(this.getValue()) ? this.getValue() : '';
    this.instance.updateValue(value, {modified: true});
  }

  beforeSubmit() {
    this.onChange();
    super.beforeSubmit();
  }

  checkMinMax(value) {
    let isValid = true;
    const { minDate: min, maxDate: max } = this.instance.component.datePicker;
    const { minDate, maxDate } = this.improveMinMaxDate(min, max);

    if (minDate) {
      isValid = momentDate(value).isSameOrAfter(minDate);
    }
    if (maxDate && isValid) {
      isValid = momentDate(value).isSameOrBefore(maxDate);
    }
    return isValid;
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

  clickOutside(event) {
    if (!this.calendar.element.nativeElement.contains(event.target) && this.isPickerOpened)
      this.toggleCalendar(event);
  }

  improveMinMaxDate(minDate, maxDate) {
    if (minDate && minDate.length === 4) {
      minDate = momentDate(`${minDate}-01-01`).format('YYYY-MM-DD');
    }

    if (maxDate && maxDate.length === 4) {
      maxDate = momentDate(`${maxDate}-01-01`).subtract(1, 'day').format('YYYY-MM-DD');
    }
    return {minDate, maxDate};
  }
}
DateTimeComponent.MaterialComponent = MaterialDateComponent;
export { DateTimeComponent };
