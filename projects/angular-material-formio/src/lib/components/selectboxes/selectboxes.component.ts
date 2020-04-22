import { Component } from '@angular/core';
import { MaterialRadioComponent } from '../radio/radio.component';
import SelectBoxesComponent from 'formiojs/components/selectboxes/SelectBoxes.js';
@Component({
  selector: 'mat-formio-selectboxes',
  template: `
    <div fxLayout="column">
      <mat-label>
        {{ instance.component.label }}
        <mat-icon *ngIf="instance.component.tooltip" matSuffix matTooltip="{{ instance.component.tooltip }}">info</mat-icon>
      </mat-label>
      <mat-hint *ngIf="instance.component.description">{{ instance.component.description }}</mat-hint>
      <div
        fxFlexOffset="10px"
        fxLayout="{{ getLayout() }}"
        fxLayoutGap="10px">
        <mat-checkbox
          *ngFor="let option of instance.component.values"
          (change)="onChange()"
          [(ngModel)]="value[option.value]"
          [disabled]="disabled">
          {{ option.label }}
        </mat-checkbox>
      </div>
    </div>`
})
export class MaterialSelectBoxesComponent extends MaterialRadioComponent {
  public value: any = {};
  public disabled: boolean = false;
  setInstance(instance) {
    instance.component.values.forEach((option) => {
      this.value[option.value] = false;
    });
    super.setInstance(instance);
  }
  getValue() {
    return this.value;
  }
  setValue(value) {
    for (const prop in value) {
      if (value.hasOwnProperty(prop)) {
        this.value[prop] = value[prop];
      }
    }
  }
  setDisabled(disabled) {
    this.disabled = !!disabled;
  }
  onChange() {
    this.instance.updateValue(this.getValue(), {modified: true});
    this.instance.triggerChange({modified: true});
  }
}
SelectBoxesComponent.MaterialComponent = MaterialSelectBoxesComponent;
export { SelectBoxesComponent };
