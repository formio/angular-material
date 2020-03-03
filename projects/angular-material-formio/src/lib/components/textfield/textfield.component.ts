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
           [disabled]="instance.component.disabled"
           [placeholder]="instance.component.placeholder"
           [disabled]="instance?.component?.disabled"
           (input)="onChange()" #input>
    <span *ngIf="instance.component.suffix" matSuffix>{{ instance.component.suffix }}</span>
    <mat-icon *ngIf="instance.component.tooltip" matSuffix matTooltip="{{ instance.component.tooltip }}">info</mat-icon>
    <mat-hint *ngIf="instance.component.showWordCount">
      {{  instance.component.showCharCount ? getWordsCount() + ' words, ' : getWordsCount() + 'words'  }}
    </mat-hint>
    <mat-hint *ngIf="instance.component.showCharCount">
      {{  control.value?.length  }} characters
    </mat-hint>
    <br/>
    <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
  </mat-form-field>
    <mat-hint *ngIf="instance.component.description">{{ instance.component.description }}</mat-hint>
  `;
@Component({
  selector: 'mat-formio-textfield',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialTextfieldComponent extends MaterialComponent {
  public inputType = 'text';

  getWordsCount() {
    const matches = this.control.value ? this.control.value.match(/[\w\d’'-]+/gi) : [];
    return matches.length ? matches.length : 0;
  }
}
TextFieldComponent.MaterialComponent = MaterialTextfieldComponent;
export { TextFieldComponent };
