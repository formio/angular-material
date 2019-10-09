import { Component } from '@angular/core';
import { MaterialTextfieldComponent, TEXTFIELD_TEMPLATE } from '../textfield/textfield.component';
import NumberComponent from 'formiojs/components/number/Number.js';
@Component({
  selector: 'mat-formio-number',
  template: TEXTFIELD_TEMPLATE
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
