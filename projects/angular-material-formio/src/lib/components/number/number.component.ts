import { Component } from '@angular/core';
import { MaterialTextfieldComponent } from '../textfield/textfield.component';
import NumberComponent from 'formiojs/components/number/Number';
@Component({
  selector: 'mat-formio-number',
  template: `<mat-formio-textfield [instance]="instance"></mat-formio-textfield>`
})
export class MaterialNumberComponent extends MaterialTextfieldComponent {}
NumberComponent.MaterialComponent = MaterialNumberComponent;
export { NumberComponent };
