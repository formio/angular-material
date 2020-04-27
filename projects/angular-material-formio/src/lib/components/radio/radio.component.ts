import { Component } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import RadioComponent from 'formiojs/components/radio/Radio.js';

@Component({
  selector: 'mat-formio-radio',
  template: `
    <div fxLayout="column">
      <mat-label>
        {{ instance.component.label }}
        <mat-icon *ngIf="instance.component.tooltip" matSuffix matTooltip="{{ instance.component.tooltip }}">info</mat-icon>
      </mat-label>
      <mat-hint *ngIf="instance.component.description">{{ instance.component.description }}</mat-hint>
      <mat-radio-group
        (change)="onChange()"
        [formControl]="control"
        fxFlexOffset="10px"
        fxLayout="{{ getLayout() }}"
        fxLayoutGap="10px">
        <mat-radio-button *ngFor="let option of instance.component.values"
                          value="{{ option.value }}"
                          [checked]="isRadioChecked(option)"
                          (keyup.space)="clearValue($event, option)"
                          (click)="clearValue($event, option)"
        >
          {{ option.label }}
        </mat-radio-button>
      </mat-radio-group>
    </div>
  `
})
export class MaterialRadioComponent extends MaterialComponent {
  getLayout() {
    return this.instance.component.inline ? 'row' : 'column';
  }

  isRadioChecked(option) {
    return option.value === this.instance.dataValue;
  }

  clearValue(event, option) {
    if (this.isRadioChecked(option)) {
      event.preventDefault();
      this.deselectValue();
    }
  }

  deselectValue() {
    this.instance.updateValue(null, {
      modified: true,
    });
  }
}
RadioComponent.MaterialComponent = MaterialRadioComponent;
export { RadioComponent };
