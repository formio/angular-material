import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialComponent } from '../MaterialComponent';
import TimeComponent from 'formiojs/components/time/Time.js';

@Component({
  selector: 'mat-formio-time',
  template: `
    <mat-form-field>
      <mat-label *ngIf="instance">
          {{ instance.component.label }}
      </mat-label>
      <input type="time" matInput [formControl]="timeControl" (input)="sendMessage()" value="00:00:00">
    </mat-form-field>
    <div class="help-block" *ngIf="instance">
        {{ instance.component.description  }}
    </div>
  `
})

export class MaterialTimeComponent extends MaterialComponent {
  public disabled: boolean = false;
  public timeControl: FormControl = new FormControl({value: '00:00:00'});
  @Output() selectedEvent = new EventEmitter<any>();

  setDisabled(disabled) {
    disabled ? this.timeControl.disable() : this.timeControl.enable();
  }

  setInstance(instance) {
    this.timeControl.setValue(this.getDefaultValue(instance));
    super.setInstance(instance);
  }

  sendMessage() {
    this.selectedEvent.emit(this.timeControl)
  }

  getDefaultValue(instance) {
    return instance.component.defaultValue || '';
  }
}

TimeComponent.MaterialComponent = MaterialTimeComponent;
export { TimeComponent };
