import { Component, OnInit } from '@angular/core';
import TextFieldComponent from 'formiojs/components/textfield/TextField.js';
import { MaterialComponent } from '../MaterialComponent';

export const TEXTFIELD_TEMPLATE = `
  <mat-formio-form-field [instance]="instance" [componentTemplate]="componentTemplate"></mat-formio-form-field>
  <ng-template #componentTemplate let-hasLabel>
    <mat-form-field [appearance]="getFormFieldAppearance()">

      <mat-label *ngIf="hasLabel">
          <span [instance]="instance" matFormioLabel></span>
      </mat-label>

      <span *ngIf="instance.component.prefix && instance.type !== 'currency'"
            matPrefix
      >
        {{ instance.component.prefix }}&nbsp;
      </span>
      <input matInput
            type="{{ inputType }}"
            [formControl]="control"
            [placeholder]="instance.component.placeholder"
            (input)="onChange()" #input
      >
      <span *ngIf="instance.component.suffix" matSuffix>{{ instance.component.suffix }}</span>

      <mat-hint *ngIf="instance.component.showWordCount">
        {{  instance.component.showCharCount ? getWordsCount() + ' words, ' : getWordsCount() + 'words'  }}
      </mat-hint>

      <mat-hint *ngIf="instance.component.showCharCount">
        {{  control.value?.length  }} characters
      </mat-hint>

      <br/>
      <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
    </mat-form-field>
  </ng-template>
`;

@Component({
  selector: 'mat-formio-textfield',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialTextfieldComponent extends MaterialComponent implements OnInit {
  public inputType = 'text';

  ngOnInit() {
    if (this.instance && this.control && this.instance.component.disabled) {
      this.control.disable();
    }
  }

  getWordsCount() {
    const matches = this.control.value ? this.control.value.match(/[\w\d’'-]+/gi) : [];
    return matches ? matches.length : 0;
  }

  getFormFieldAppearance() {
    const appearances = ['legacy', 'standard', 'fill', 'outline'];
    const appearance = this.instance.component.appearance ? this.instance.component.appearance.toLowerCase() : '';
    return appearances.includes(appearance) ? appearance : 'legacy';
  }
}
TextFieldComponent.MaterialComponent = MaterialTextfieldComponent;
export { TextFieldComponent };
