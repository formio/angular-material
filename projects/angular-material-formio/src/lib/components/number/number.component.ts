import { Component } from '@angular/core';
import { MaterialTextfieldComponent } from '../textfield/textfield.component';
import NumberComponent from 'formiojs/components/number/Number.js';
@Component({
  selector: 'mat-formio-number',
  template: `<mat-formio-input [instance]="instance" [control]="control" inputType="text"></mat-formio-input>`
})
export class MaterialNumberComponent extends MaterialTextfieldComponent {
  getValue() {
    return parseFloat(this.control.value);
  }

  setValue(value) {
    return super.setValue(value.toString());
  }
}
NumberComponent.MaterialComponent = MaterialNumberComponent;
export { NumberComponent };
