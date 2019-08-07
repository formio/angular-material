import { Component } from '@angular/core';
import { MaterialTextfieldComponent } from '../textfield/textfield.component';
import PhoneNumberComponent from 'formiojs/components/phonenumber/PhoneNumber';
@Component({
  selector: 'mat-formio-phonenumber',
  template: `<mat-formio-textfield [instance]="instance"></mat-formio-textfield>`
})
export class MaterialPhoneNumberComponent extends MaterialTextfieldComponent {}
PhoneNumberComponent.MaterialComponent = MaterialPhoneNumberComponent;
export { PhoneNumberComponent };
