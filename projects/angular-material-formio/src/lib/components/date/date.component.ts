import {Component, NgModule} from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import DateTimeComponent from 'formiojs/components/datetime/DateTime.js';
import { momentDate } from 'formiojs/utils/utils.js';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'mat-formio-date',
  template: `    
      <div>
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
      </div>
  `
})

export class MaterialDateComponent extends MaterialComponent {
  public timeControl: FormControl = new FormControl();
  public isDateEnabled: Boolean;
  public isPickerOpened: Boolean;
  public selectedDate: any;
  public selectedTime: any;

  onChangeDate(event) {
    this.selectedDate = momentDate(event).format('YYYY-MM-DD');
    this.control.setValue(this.selectedDate);
    if (this.selectedTime || !this.instance.component.enableTime) {
      this.setDateTime();
    }
  }

  onChangeTime(time) {
    this.selectedTime = time;
    if (this.selectedDate) {
      this.setDateTime();
    }
  }

  setDateTime() {
    this.control.setValue(`${this.selectedDate}T${this.selectedTime}`)
  }

  ngOnInit() {
    this.isDateEnabled = this.instance.component.enableDate
  }

  setInstance(instance: any) {
    super.setInstance(instance);
  }

  toggleCalendar() {
    this.isPickerOpened = !this.isPickerOpened;
  }
}
DateTimeComponent.MaterialComponent = MaterialDateComponent;
export { DateTimeComponent };
