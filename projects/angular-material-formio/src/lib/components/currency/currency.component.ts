import { Component } from '@angular/core';
import { MaterialTextfieldComponent, TEXTFIELD_TEMPLATE } from '../textfield/textfield.component';
import CurrencyComponent from 'formiojs/components/currency/Currency.js';
@Component({
  selector: 'mat-formio-currency',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialCurrencyComponent extends MaterialTextfieldComponent {}
CurrencyComponent.MaterialComponent = MaterialCurrencyComponent;
export { CurrencyComponent };
