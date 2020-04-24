import { Component } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import RadioComponent from 'formiojs/components/radio/Radio.js';
@Component({
  selector: 'mat-formio-radio',
  template: `
    <mat-formio-form-field [instance]="instance" [componentTemplate]="componentTemplate"></mat-formio-form-field>
    <ng-template #componentTemplate let-hasLabel>
      <div fxLayout="column">
        <mat-label *ngIf="hasLabel">
          <span [instance]="instance" matFormioLabel></span>
        </mat-label>

        <mat-radio-group
                (change)="onChange()"
                [formControl]="control"
                fxFlexOffset="10px"
                fxLayout="{{ getLayout() }}"
                fxLayoutGap="10px"
        >
          <mat-radio-button *ngFor="let option of instance.component.values"
                            value="{{ option.value }}"
                            [checked]="isRadioChecked(option)"
          >
            {{ option.label }}
          </mat-radio-button>
        </mat-radio-group>
      </div>
    </ng-template>
  `
})
export class MaterialRadioComponent extends MaterialComponent {
  getLayout() {
    return this.instance.component.inline ? 'row' : 'column';
  }

  isRadioChecked(option) {
    return option.value === this.instance.component.defaultValue;
  }
}
RadioComponent.MaterialComponent = MaterialRadioComponent;
export { RadioComponent };
