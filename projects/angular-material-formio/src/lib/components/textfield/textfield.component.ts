import { Component } from '@angular/core';
import TextFieldComponent from 'formiojs/components/textfield/TextField.js';
import { MaterialComponent } from '../MaterialComponent';
export const TEXTFIELD_TEMPLATE = `
  <mat-form-field fxFill>
    <mat-label>{{ instance.component.label }}</mat-label>
    <span *ngIf="instance.component.prefix" matPrefix>{{ instance.component.prefix }}&nbsp;</span>
    <input matInput
           type="{{ inputType }}"
           [required]="instance.component.validate?.required"
           [formControl]="control"
           [placeholder]="instance.component.placeholder"
           (input)="onChange()" #input>
    <span *ngIf="instance.component.suffix" matSuffix>{{ instance.component.suffix }}</span>
    <mat-icon *ngIf="instance.component.tooltip" matSuffix matTooltip="{{ instance.component.tooltip }}">info</mat-icon>
    <mat-hint *ngIf="instance.component.description">{{ instance.component.description }}</mat-hint>
    <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
  </mat-form-field>
  `;
@Component({
  selector: 'mat-formio-textfield',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialTextfieldComponent extends MaterialComponent {
  public inputType = 'text';
}
TextFieldComponent.MaterialComponent = MaterialTextfieldComponent;
export { TextFieldComponent };
