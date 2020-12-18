import { Component, ViewChild } from '@angular/core'
import { MaterialComponent } from '../MaterialComponent';
import DateTimeComponent from 'formiojs/components/datetime/DateTime.js';
import { momentDate, convertFormatToMoment, convertFormatToMask, getInputMask } from 'formiojs/utils/utils.js';
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
            matInput
            [placeholder]="instance.component.placeholder"
            [formControl]="displayControl"
            [textMask]="{mask: getMask()}"
            (input)="onChange"
            [readonly]="!allowManualInput"
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
          [instance]="instance"
        ></mat-formio-calendar>
        <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
      </form>
    </ng-template>
  `
})

export class MaterialDateComponent extends MaterialComponent {
  public timeControl: FormControl = new FormControl();
  public displayControl: FormControl = new FormControl();
  public isPickerOpened: boolean;
  public selectedDate: any;
  public selectedTime: any = '00:00';
  public allowManualInput: boolean = true;

  @ViewChild('calendar') calendar;

  get enableDate() {
    return this.instance && this.instance.component.enableDate !== false;
  }

  get enableTime() {
    return this.instance && this.instance.component.enableTime === true;
  }

  setDisplayControlValue(value = null) {
    const format = this.getFormat();

    value = value || this.getDateTimeValue();

    if (value) {
      value = momentDate(value).format(format);
      this.displayControl.setValue(value);
    }
    else {
      this.displayControl.setValue('');
    }
  }

  getFormat() {
    const {format} = this.instance.component;

    if (!format) {
      return 'YYYY-MM-DD hh:mm A';
    }

    return convertFormatToMoment(format);
  }

  getMask() {
    const {format} = this.instance.component;
    const formioFormat = convertFormatToMask(format);

    return getInputMask(formioFormat);
  }

  onChangeDate(event) {
    this.selectedDate = momentDate(event).format(this.getFormat());
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
    let newDate = '';
    let isSelectedTime = false;

    if (this.calendar && this.calendar.selectedTime) {
      const { selectedTime } = this.calendar;
      isSelectedTime = true;

      if (this.selectedTime !== selectedTime) {
        this.selectedTime = selectedTime;
      }
    }

    if (this.enableTime && this.enableDate) {
      const [hours, minutes] = this.selectedTime.split(':');
      newDate = isSelectedTime
          ? momentDate(this.selectedDate)
           .hours(Number.parseInt(hours))
           .minutes(Number.parseInt(minutes))
          : this.selectedDate;
    }

    if (!this.enableTime && this.enableDate) {
      newDate = this.selectedDate;
    }

    if (this.enableTime && !this.enableDate) {
      const [hours, minutes] = this.selectedTime.split(':');
      newDate = momentDate(new Date())
        .hours(Number.parseInt(hours))
        .minutes(Number.parseInt(minutes))
        .seconds(0);
    }

    return newDate;
  }
  setDateTime() {
    this.control.setValue(this.getDateTimeValue());
    this.onChange();
  }

  setInstance(instance: any) {
    super.setInstance(instance);
    this.isDisabled() ? this.control.disable() : this.control.enable();
    this.isDisabled() ? this.displayControl.disable() : this.displayControl.enable();

    if (this.instance) {
      this.allowManualInput = this.instance.component.allowInput === false ? false : true;
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
      if (!this.isPickerOpened) {
        const date = this.getValue();
        if (date &&this.checkMinMax(date)) {
          if (this.enableDate && this.calendar && !this.calendar.selectedDate) {
            this.calendar.setExistedDate(momentDate(date).toDate())
          }

          if (this.enableTime && this.calendar && !this.calendar.selectedTime) {
            const time = momentDate(date)
            this.calendar.setExistedTime(time.format('HH:mm'), time.format('h:mm:A'))
          }
        }
      }
      this.isPickerOpened = !this.isPickerOpened;
      event.stopPropagation();
    }
  }

  isDisabled() {
    const { readonly, disabled } = this.instance.component;
    return readonly || disabled || this.instance.root.options.readOnly
  }

  public formatTime = (value) =>  {
    const format = this.getFormat();

    if (!value) {
      return format;
    }
    return momentDate(value).format(format);
  }

  setValue(value) {
    if (this.dateFilter(value) && this.checkMinMax(value)) {
      this.setDisplayControlValue(value);
      super.setValue(value);
    }
  }

  onChange() {
    const value = this.dateFilter(this.getValue()) && this.checkMinMax(this.getValue()) ? this.getValue() : '';
    this.setDisplayControlValue(value);
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
    if (d && d.getDay) {
      const day = d.getDay();
      return day !== 0 && day !== 6;
    }
    return true;
  }

  disableDates(dates: Array<string>, d: Date) {
    const formattedDates = dates.map((date) => momentDate(date).format('YYYY-MM-DD'));
    return !formattedDates.includes(momentDate(d).format('YYYY-MM-DD'));
  }

  dateFilter = (d: Date | null): boolean => {
    const isValid = this.instance.component.datePicker.disableWeekends ? this.disableWeekends(d) : true;
    return this.instance.component.widget.disabledDates && isValid ?
      this.disableDates(this.instance.component.widget.disabledDates.split(','), d) : isValid;
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
