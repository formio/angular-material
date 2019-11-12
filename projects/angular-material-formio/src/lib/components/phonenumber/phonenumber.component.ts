import { Component } from '@angular/core';
import { MaterialTextfieldComponent } from '../textfield/textfield.component';
import PhoneNumberComponent from 'formiojs/components/phonenumber/PhoneNumber.js';
@Component({
  selector: 'mat-formio-phonenumber',
  template: `<mat-formio-input [instance]="instance" [control]="control" inputType="text"></mat-formio-input>`
})
export class MaterialPhoneNumberComponent extends MaterialTextfieldComponent {}
PhoneNumberComponent.MaterialComponent = MaterialPhoneNumberComponent;
export { PhoneNumberComponent };
