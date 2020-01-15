import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialComponent } from '../MaterialComponent';
import TimeComponent from 'formiojs/components/time/Time.js';

@Component({
  selector: 'mat-formio-time',
  template: `
    <mat-form-field>
      <mat-label>
          {{ instance.component.label }}
      </mat-label>
      <input type="time" matInput [formControl]="timeControl">
    </mat-form-field>
    <div class="help-block">
        {{ instance.component.description  }}
    </div>
  `
})

export class MaterialTimeComponent extends MaterialComponent {
  public disabled: boolean = false;
  public timeControl: FormControl = new FormControl();

  setDisabled(disabled) {
    disabled ? this.timeControl.disable() : this.timeControl.enable();
  }

  setInstance(instance) {
    super.setInstance(instance);
  }
}

TimeComponent.MaterialComponent = MaterialTimeComponent;
export { TimeComponent };
