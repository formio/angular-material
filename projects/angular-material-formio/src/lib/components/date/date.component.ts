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
        <mat-datepicker-toggle [disabled]="isDisabled()" (click)="toggleCalendar($event)"></mat-datepicker-toggle>
        <mat-form-field class="example-full-width">
          <input
                  *ngIf="instance.component.enableTime && instance.component.enableDate !== false"
                  matInput
                  type="datetime-local"
                  [placeholder]="instance.component.placeholder"
                  [formControl]="control"
                  (input)="onChange()"
                  readonly
          >
          <input
                  *ngIf="!instance.component.enableTime && instance.component.enableDate !== false"
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
                [enableDate]="instance.component.enableDate"
                [enableTime]="instance.component.enableTime"
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
    return this.instance.component.readonly || this.instance.component.disabled || this.instance.root.options.readOnly
  }

  getDate() {
    return momentDate(this.control).format('YYYY-MM-DD');
  }

  getTime() {
    return momentDate(this.control).format('HH.mm');
  }

  setValue(value) {
    if (this.dateFilter(value) && this.checkMinMax(value)) {
      if (value) {
        const format = `YYYY-MM-DD${this.instance.component.enableTime ? 'THH:mm' : ''}`;
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
