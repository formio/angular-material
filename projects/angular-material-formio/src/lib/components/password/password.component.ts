import { Component } from '@angular/core';
import { MaterialTextfieldComponent } from '../textfield/textfield.component';
import PasswordComponent from 'formiojs/components/password/Password.js';
@Component({
  selector: 'mat-formio-password',
  template: `<mat-formio-textfield inputType="password" [instance]="instance"></mat-formio-textfield>`
})
export class MaterialPasswordComponent extends MaterialTextfieldComponent {}
PasswordComponent.MaterialComponent = MaterialPasswordComponent;
export { PasswordComponent };
