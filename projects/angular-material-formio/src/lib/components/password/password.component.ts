import { Component } from '@angular/core';
import { MaterialTextfieldComponent, TEXTFIELD_TEMPLATE } from '../textfield/textfield.component';
import PasswordComponent from 'formiojs/components/password/Password.js';
@Component({
  selector: 'mat-formio-password',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialPasswordComponent extends MaterialTextfieldComponent {
  public inputType = 'password';
}
PasswordComponent.MaterialComponent = MaterialPasswordComponent;
export { PasswordComponent };
