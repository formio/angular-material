import { Component } from '@angular/core';
import { MaterialTextfieldComponent, TEXTFIELD_TEMPLATE } from '../textfield/textfield.component';
import EmailComponent from 'formiojs/components/email/Email.js';
@Component({
  selector: 'mat-formio-email',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialEmailComponent extends MaterialTextfieldComponent {
  public inputType = 'email';
}
EmailComponent.MaterialComponent = MaterialEmailComponent;
export { EmailComponent };
