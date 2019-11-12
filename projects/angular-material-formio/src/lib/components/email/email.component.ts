import { Component } from '@angular/core';
import { MaterialTextfieldComponent } from '../textfield/textfield.component';
import EmailComponent from 'formiojs/components/email/Email.js';
@Component({
  selector: 'mat-formio-email',
  template: `<mat-formio-input [instance]="instance" [control]="control" inputType="email"></mat-formio-input>`
})
export class MaterialEmailComponent extends MaterialTextfieldComponent {}
EmailComponent.MaterialComponent = MaterialEmailComponent;
export { EmailComponent };
