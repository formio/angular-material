import {Component, EventEmitter, Input, NgModule, Output, ViewChild} from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
@Component({
  selector: 'mat-formio-calendar',
  styles: [
    `.calendar, .formio-time {
      padding: 16px;
      background-color: white;
      box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    }
    .formio-time {
      display: flex;
    }
    `
  ],
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutGap="0.5%">
      <div [ngStyle]="getPopupStyles()">
        <mat-card style="padding: 0;">
          <mat-calendar
                  [dateFilter]="dateFilter"
                  [maxDate]="maxDate"
                  [minDate]="minDate"
                  [selected]="selectedDate"
                  (selectedChange)="onDate($event)"
                  class="calendar"
                  *ngIf="enableDate !== false"
          >
          </mat-calendar>
          <mat-formio-time
                  #time
                  [hourStep]="hourStep"
                  [instance]="instance"
                  [renderElementOnly]="true"
                  [minuteStep]="minuteStep"
                  (selectedEvent)="onTime($event)"
                  class="ml-3 formio-time"
                  *ngIf="enableTime"
          >
          </mat-formio-time>
        </mat-card>
      </div>
    </div>
  `
})

export class MaterialCalendarComponent extends MaterialComponent {
  public selectedDate: any;
  public selectedTime: any;
  public selectedTimeComponent: any;

  @ViewChild('time') time;

  @Input() enableDate: boolean;
  @Input() enableTime: boolean;
  @Input() minDate: any;
  @Input() maxDate: any;
  @Input() dateFilter: any;
  @Input() hourStep: any;
  @Input() minuteStep: any;
  @Output() timeSelectEvent = new EventEmitter<any>();
  @Output() dateSelectEvent = new EventEmitter<any>();

  setInstance(instance: any) {
    super.setInstance(instance);
  }

  setExistedDate(value) {
    this.selectedDate = value;
  }

  setExistedTime(value, forTime) {
    this.selectedTime = value;
    this.time.setValue(forTime);
  }

  onDate(event){
    this.selectedDate = event;
    this.dateSelectEvent.emit(this.selectedDate);
  }

  onTime(event) {
    this.selectedTime = event.value;
    this.timeSelectEvent.emit(this.selectedTime);
  }

  getPopupStyles() {
    return {
      position: 'absolute',
      zIndex: '1000',
      display: 'flex',
      maxWidth: '100%',
      maxHeight: '100%',
      top: '90px',
      left: '30px'
    }
  }
}
