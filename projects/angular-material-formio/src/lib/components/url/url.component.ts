import { Component } from '@angular/core';
import { MaterialTextfieldComponent, TEXTFIELD_TEMPLATE } from '../textfield/textfield.component';
import UrlComponent from 'formiojs/components/url/Url.js';
@Component({
  selector: 'mat-formio-url',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialUrlComponent extends MaterialTextfieldComponent {
  public inputType = 'url';
}
UrlComponent.MaterialComponent = MaterialUrlComponent;
export { UrlComponent };
