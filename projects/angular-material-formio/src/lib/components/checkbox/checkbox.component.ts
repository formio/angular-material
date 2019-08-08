import { Component } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import CheckboxComponent from 'formiojs/components/checkbox/Checkbox';
@Component({
  selector: 'mat-formio-checkbox',
  template: `
    <mat-checkbox (change)="onChange()" [formControl]="control">{{ instance.component.label }}
      <mat-icon *ngIf="instance.component.tooltip" matSuffix matTooltip="{{ instance.component.tooltip }}">info</mat-icon>
    </mat-checkbox>
  `
})
export class MaterialCheckboxComponent extends MaterialComponent {}
CheckboxComponent.MaterialComponent = MaterialCheckboxComponent;
export { CheckboxComponent };
