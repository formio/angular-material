import { Component } from '@angular/core';
import { MaterialTextfieldComponent } from '../textfield/textfield.component';
import UrlComponent from 'formiojs/components/url/Url.js';
@Component({
  selector: 'mat-formio-url',
  template: `<mat-formio-input [instance]="instance" [control]="control" inputType="url"></mat-formio-input>`
})
export class MaterialUrlComponent extends MaterialTextfieldComponent {}
UrlComponent.MaterialComponent = MaterialUrlComponent;
export { UrlComponent };
