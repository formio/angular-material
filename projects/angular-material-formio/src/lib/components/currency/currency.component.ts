import { Component } from '@angular/core';
import { MaterialTextfieldComponent } from '../textfield/textfield.component';
import CurrencyComponent from 'formiojs/components/currency/Currency.js';
@Component({
  selector: 'mat-formio-currency',
  template: `<mat-formio-textfield [instance]="instance"></mat-formio-textfield>`
})
export class MaterialCurrencyComponent extends MaterialTextfieldComponent {}
CurrencyComponent.MaterialComponent = MaterialCurrencyComponent;
export { CurrencyComponent };
