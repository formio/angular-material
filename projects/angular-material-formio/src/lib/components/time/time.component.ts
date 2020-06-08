import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialComponent } from '../MaterialComponent';
import TimeComponent from 'formiojs/components/time/Time.js';
import * as moment_ from 'moment';
@Component({
  selector: 'mat-formio-time',
  template: `
    <mat-formio-form-field [instance]="instance" [componentTemplate]="componentTemplate"></mat-formio-form-field>
    <ng-template #componentTemplate let-hasLabel>
      <mat-label fxFill *ngIf="hasLabel">
        <span [instance]="instance" matFormioLabel></span>
      </mat-label>

      <div style="display: block">
        <div fxLayout="row" fxLayoutGap="5%">
          <input
            [formControl]="hourControl"
            [step]="hourStep"
            [min]="0"
            [max]="12"
            type="number"
            fxFlex="25%"
            (input)="onChange()"
          >
          <input
            [formControl]="minuteControl"
            [step]="minuteStep"
            [min]="0"
            [max]="59"
            type="number"
            fxFlex="25%"
            (input)="onChange()"
          >
          <input
            [formControl]="secondControl"
            [step]="secondStep"
            [min]="0"
            [max]="59"
            type="number"
            fxFlex="25%"
            (input)="onChange()"
            *ngIf="instance?.component?.dataFormat === 'HH:mm:ss' ||
             instance?.component?.dataFormat === 'HH:mm:ss.SSS'"
          >
          <button 
            [disabled]="instance?.component?.disabled"
            fxFlex="25%"
            (click)="changePeriod()"
          >
            {{period}}
          </button>
        </div>
        <mat-error *ngIf="instance?.error">{{ instance.error.message }}</mat-error>
      </div>
    </ng-template>
  `
})

export class MaterialTimeComponent extends MaterialComponent {
  public disabled = false;
  public period = 'AM';
  public hourControl: FormControl = new FormControl();
  public minuteControl: FormControl = new FormControl();
  public secondControl: FormControl = new FormControl();
  @Output() selectedEvent = new EventEmitter<any>();
  @Input() hourStep = 1;
  @Input() minuteStep = 1;
  @Input() secondStep = 1;

  setDisabled(disabled) {
    if (disabled) {
      this.hourControl.disable();
      this.minuteControl.disable();
      this.secondControl.disable();
    }
  }

  setInstance(instance) {
    super.setInstance(instance);
    this.control.setValue('00:00:00');
    this.onChange();
  }

  onChange() {
    const value = this.getTwentyFourHourTime(`${this.hourControl.value}
      :${this.minuteControl.value}:${this.secondControl.value || ''} ${this.period}`);
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
    return moment(amPmString, ['h:mm:ss A']).format(this.instance.component.dataFormat);
  }

  changePeriod() {
    this.period = this.period === 'AM' ? 'PM' : 'AM';
    this.onChange();
  }
}

TimeComponent.MaterialComponent = MaterialTimeComponent;
export { TimeComponent };
