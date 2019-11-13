import { Component } from '@angular/core';
import { MaterialTextfieldComponent, TEXTFIELD_TEMPLATE } from '../textfield/textfield.component';
import PhoneNumberComponent from 'formiojs/components/phonenumber/PhoneNumber.js';
@Component({
  selector: 'mat-formio-phonenumber',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialPhoneNumberComponent extends MaterialTextfieldComponent {
  public inputType = 'text';
}
PhoneNumberComponent.MaterialComponent = MaterialPhoneNumberComponent;
export { PhoneNumberComponent };
