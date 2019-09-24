import { Component } from '@angular/core';
import { MaterialTextfieldComponent } from '../textfield/textfield.component';
import EmailComponent from 'formiojs/components/email/Email.js';
@Component({
  selector: 'mat-formio-email',
  template: `<mat-formio-textfield inputType="email" [instance]="instance"></mat-formio-textfield>`
})
export class MaterialEmailComponent extends MaterialTextfieldComponent {}
EmailComponent.MaterialComponent = MaterialEmailComponent;
export { EmailComponent };
