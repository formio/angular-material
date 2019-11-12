import { Component } from '@angular/core';
import { MaterialTextfieldComponent } from '../textfield/textfield.component';
import PasswordComponent from 'formiojs/components/password/Password.js';
@Component({
  selector: 'mat-formio-password',
  template: `<mat-formio-input [instance]="instance" [control]="control" inputType="password"></mat-formio-input>`
})
export class MaterialPasswordComponent extends MaterialTextfieldComponent {}
PasswordComponent.MaterialComponent = MaterialPasswordComponent;
export { PasswordComponent };
