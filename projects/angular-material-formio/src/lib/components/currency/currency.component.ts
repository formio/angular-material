import { Component } from '@angular/core';
import { TEXTFIELD_TEMPLATE } from '../textfield/textfield.component';
import { MaterialNumberComponent } from '../number/number.component';
import CurrencyComponent from 'formiojs/components/currency/Currency.js';
import _ from 'lodash';

@Component({
  selector: 'mat-formio-currency',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialCurrencyComponent extends MaterialNumberComponent {
  public inputType = 'text';

  onChange() {
    const newValue = _.isNil(this.getValue()) ? '' : this.getValue();
    this.instance.updateValue(newValue, {modified: true});
  }
}
CurrencyComponent.MaterialComponent = MaterialCurrencyComponent;
export { CurrencyComponent };
