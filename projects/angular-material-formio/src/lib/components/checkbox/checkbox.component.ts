import { Component } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import CheckboxComponent from 'formiojs/components/checkbox/Checkbox.js';
import _ from 'lodash';

@Component({
  selector: 'mat-formio-checkbox',
  template: `
    <mat-checkbox (change)="onChange()" [ngClass]="{'validation-error' : !!instance.error}"
                  [formControl]="control"
    >
      <span matFormioLabel [instance]="instance"></span>
      <mat-icon *ngIf="instance.component.tooltip" matSuffix
                matTooltip="{{ instance.component.tooltip }}" style="font-size: 1rem;">info
      </mat-icon>
    </mat-checkbox>
    <mat-hint>
      {{ instance.component.description  }}
    </mat-hint>
    <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
  `,
  styles:['::ng-deep .mat-checkbox.validation-error .mat-checkbox-frame {border-color: red; }']
})
export class MaterialCheckboxComponent extends MaterialComponent {
  getValue() {
    return _.isNil(this.control.value) ? '' : this.control.value;
  }
}
CheckboxComponent.MaterialComponent = MaterialCheckboxComponent;
export { CheckboxComponent };
