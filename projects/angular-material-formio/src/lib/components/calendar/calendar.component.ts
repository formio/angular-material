import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MaterialComponent } from '../MaterialComponent';
import { momentDate } from 'formiojs/utils/utils.js';
import {FormControl} from "@angular/forms";
const ISO_8601_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';
@Component({
  selector: 'mat-formio-calendar',
  template: `    
          <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutGap="0.5%">
            <mat-card>
              <mat-calendar [selected]="selectedDate" (selectedChange)="onDate($event)" *ngIf="enableDate !== false"></mat-calendar>
              <mat-formio-time (selectedEvent)="onTime($event)" class="ml-3" *ngIf="enableTime"></mat-formio-time>
            </mat-card>
          </div>
  `
})

export class MaterialCalendarComponent extends MaterialComponent {
  public selectedDate: any;
  public selectedTime: any;

  @Input() enableDate: Boolean;
  @Input() enableTime: Boolean;

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
}
