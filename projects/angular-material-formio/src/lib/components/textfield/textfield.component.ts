import { Component } from '@angular/core';
import TextFieldComponent from 'formiojs/components/textfield/TextField.js';
import { MaterialComponent } from '../MaterialComponent';
@Component({
  selector: 'mat-formio-textfield',
  template: `<mat-formio-input [instance]="instance" [control]="control" inputType="text"></mat-formio-input>`
})
export class MaterialTextfieldComponent extends MaterialComponent {}
TextFieldComponent.MaterialComponent = MaterialTextfieldComponent;
export { TextFieldComponent };
