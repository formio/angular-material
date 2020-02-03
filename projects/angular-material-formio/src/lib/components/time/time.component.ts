import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialComponent } from '../MaterialComponent';
import TimeComponent from 'formiojs/components/time/Time.js';

@Component({
  selector: 'mat-formio-time',
  template: `
    <mat-form-field *ngIf="instance">
      <mat-label *ngIf="instance">
          {{ instance.component.label }}
      </mat-label>
      <input type="time" matInput [formControl]="control" (input)="sendMessage()">
        <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
    </mat-form-field>
    <div class="help-block" *ngIf="instance">
        {{ instance.component.description  }}
    </div>
  `
})

export class MaterialTimeComponent extends MaterialComponent {
  public disabled: boolean = false;
  @Output() selectedEvent = new EventEmitter<any>();

  setDisabled(disabled) {
    disabled ? this.control.disable() : this.control.enable();
  }

  setInstance(instance) {
    super.setInstance(instance);
    this.control.setValue('00:00:00');
    this.onChange();
  }

  sendMessage() {
    this.onChange();
    this.selectedEvent.emit(this.control)
  }
}

TimeComponent.MaterialComponent = MaterialTimeComponent;
export { TimeComponent };
