import { Component } from '@angular/core';
import { MaterialTextfieldComponent, TEXTFIELD_TEMPLATE } from '../textfield/textfield.component';
import NumberComponent from 'formiojs/components/number/Number.js';
@Component({
  selector: 'mat-formio-number',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialNumberComponent extends MaterialTextfieldComponent {
  public inputType = 'text';
  getValue() {
    return this.instance ? this.instance.parseNumber(this.control.value) : this.control.value;
  }

  setValue(value) {
    return super.setValue(
      this.instance ? this.instance.getMaskedValue(this.instance.formatValue(this.instance.parseValue(value))) : value.toString()
    );
  }
}
NumberComponent.MaterialComponent = MaterialNumberComponent;
export { NumberComponent };
