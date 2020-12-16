import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import TextAreaComponent from 'formiojs/components/textarea/TextArea.js';
import isNil from 'lodash/isNil';

@Component({
  selector: 'mat-formio-textarea',
  styleUrls: ['./textarea.component.css'],
  template: `
    <mat-formio-form-field [instance]="instance" [componentTemplate]="componentTemplate"></mat-formio-form-field>
    <ng-template #componentTemplate let-hasLabel>
      <mat-form-field class="mat-formio-textarea"
                      [ngClass]="{'editor-enabled': !!instance.component.editor}"
                      fxFill
                      fxFlexAlign="center"
      >
        <mat-label fxFill *ngIf="hasLabel">
          <span [instance]="instance" matFormioLabel></span>
        </mat-label>
        <span *ngIf="instance.component.prefix" matPrefix>{{ instance.component.prefix }}&nbsp;</span>
        <textarea matInput
                  [placeholder]="instance.component.placeholder"
                  [formControl]="control"
                  [rows]="(instance.component.rows || 3)"
                  (input)="onChange()"
                   #textarea
        >
        </textarea>
        <span *ngIf="instance.component.suffix" matSuffix>{{ instance.component.suffix }}</span>
        <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
      </mat-form-field>
    </ng-template>
  `
})
export class MaterialTextareaComponent extends MaterialComponent implements AfterViewInit {
  @ViewChild('textarea') textarea: ElementRef;

  ngAfterViewInit() {
    // Attach the element so the wysiwyg will work.
    this.instance.attachElement(this.textarea.nativeElement);
  }

  getValue() {
    return isNil(this.control.value) ? '' : this.control.value;
  }
}
TextAreaComponent.MaterialComponent = MaterialTextareaComponent;
export { TextAreaComponent };
