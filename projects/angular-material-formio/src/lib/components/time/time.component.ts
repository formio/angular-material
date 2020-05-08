import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialComponent } from '../MaterialComponent';
import TimeComponent from 'formiojs/components/time/Time.js';
import * as moment_ from 'moment';
@Component({
  selector: 'mat-formio-time',
  template: `
      <div style="display: block">
        <div style="margin-left: 1rem;" fxLayout="row" fxFlex="205px" fxLayoutGap="5%">
          <input
                  [formControl]="hourControl"
                  [step]="hourStep"
                  [min]="0"
                  [max]="12"
                  type="number"
                  fxFlex="30%"
                  (input)="onChange()"
          >
          <input
                  [formControl]="minuteControl"
                  [step]="minuteStep"
                  [min]="0"
                  [max]="59"
                  type="number"
                  fxFlex="30%"
                  (input)="onChange()"
          >
          <button [disabled]="instance?.component?.disabled"
                  fxFlex="15%"
                  (click)="changePeriod()"
          >
            {{period}}
          </button>
        </div>
        <mat-error *ngIf="instance?.error">{{ instance.error.message }}</mat-error>
      </div>
  `
})

export class MaterialTimeComponent extends MaterialComponent {
  public disabled = false;
  public period = 'AM';
  public hourControl: FormControl = new FormControl();
  public minuteControl: FormControl = new FormControl();
  @Output() selectedEvent = new EventEmitter<any>();
  @Input() hourStep = 1;
  @Input() minuteStep = 1;

  setDisabled(disabled) {
    if (disabled) {
      this.hourControl.disable();
      this.minuteControl.disable();
    }
  }

  setInstance(instance) {
    super.setInstance(instance);
    this.control.setValue('00:00:00');
    this.onChange();
  }

  onChange() {
    const value = this.getTwentyFourHourTime(`${this.hourControl.value}:${this.minuteControl.value} ${this.period}`);
    this.control.setValue(value);
    if (this.instance) {
      super.onChange();
    }
    this.selectedEvent.emit(this.control)
  }

  setValue(value) {
    if (!value) {
      return;
    }
    super.setValue(value);
    const [hourValue, minuteValue, period] = value.split(':');
    this.hourControl.setValue(hourValue);
    this.minuteControl.setValue(minuteValue);
    // fix for default value with seconds instead of period
    this.period = period === ('AM' || 'PM') ? period : this.period;
  }

  getTwentyFourHourTime(amPmString) {
    const moment = moment_;
    return moment(amPmString, ['h:mm A']).format('HH:mm');
  }

  changePeriod() {
    this.period = this.period === 'AM' ? 'PM' : 'AM';
    this.onChange();
  }
}

TimeComponent.MaterialComponent = MaterialTimeComponent;
export { TimeComponent };
