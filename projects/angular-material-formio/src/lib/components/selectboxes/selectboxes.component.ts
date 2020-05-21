import { Component } from '@angular/core';
import { MaterialRadioComponent } from '../radio/radio.component';
import SelectBoxesComponent from 'formiojs/components/selectboxes/SelectBoxes.js';
@Component({
  selector: 'mat-formio-selectboxes',
  template: `
    <mat-formio-form-field [instance]="instance" [componentTemplate]="componentTemplate"></mat-formio-form-field>
    <ng-template #componentTemplate let-hasLabel>
      <div fxLayout="column">
        <mat-label *ngIf="hasLabel">
          <span [instance]="instance" matFormioLabel></span>
        </mat-label>
        <div
                fxFlexOffset="10px"
                fxLayout="{{ getLayout() }}"
                fxLayoutGap="10px"
        >
          <mat-checkbox
                  *ngFor="let option of instance.component.values"
                  (change)="onChange()"
                  [(ngModel)]="value[option.value]"
                  [disabled]="disabled"
          >
            {{ option.label }}
          </mat-checkbox>
          <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
        </div>
      </div>
    </ng-template>
  `
})
export class MaterialSelectBoxesComponent extends MaterialRadioComponent {
  public value: any = {};
  public disabled = false;

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
    const normalizedValue = this.instance.normalizeValue(value);
    for (const prop in normalizedValue) {
      if (normalizedValue.hasOwnProperty(prop)) {
        this.value[prop] = normalizedValue[prop];
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
