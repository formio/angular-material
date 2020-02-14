import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import { momentDate } from 'formiojs/utils/utils.js';
import {FormControl} from "@angular/forms";
const ISO_8601_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';
@Component({
  selector: 'mat-formio-calendar',
  template: `
          <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutGap="0.5%">
            <div [ngStyle]="getPopupStyles()">
              <mat-card style="padding: 0;">
                <mat-calendar [ngStyle]="getWidgetStyles()" [dateFilter]="dateFilter" [maxDate]="maxDate" [minDate]="minDate" [selected]="selectedDate" (selectedChange)="onDate($event)" *ngIf="enableDate !== false"></mat-calendar>
                <mat-formio-time [ngStyle]="getWidgetStyles()" [hourStep]="hourStep" [minuteStep]="minuteStep" (selectedEvent)="onTime($event)" class="ml-3" *ngIf="enableTime"></mat-formio-time>
              </mat-card>
            </div>
          </div>
  `
})

export class MaterialCalendarComponent extends MaterialComponent {
  public selectedDate: any;
  public selectedTime: any;

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

  onDate(event){
    this.selectedDate = event;
    this.dateSelectEvent.emit(this.selectedDate);
  }

  onTime(event) {
    this.selectedTime = event.value;
    this.timeSelectEvent.emit(this.selectedTime);
  }

  getWidgetStyles() {
    return {
      padding : '16px',
      backgroundColor: 'white',
      boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)'
    }
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
