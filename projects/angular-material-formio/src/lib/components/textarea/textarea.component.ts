import { Component, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import TextAreaComponent from 'formiojs/components/textarea/TextArea';
@Component({
  selector: 'mat-formio-textarea',
  template: `
    <mat-form-field class="mat-formio-textarea" [ngClass]="{'editor-enabled': !!instance.component.editor}">
      <mat-label>{{ instance.component.label }}</mat-label>
      <textarea matInput
          [required]="instance.component.validate?.required"
          [placeholder]="instance.component.placeholder"
          [formControl]="control"
          [rows]="(instance.component.rows || 3)"
          (input)="onChange()" #textarea>
      </textarea>
      <mat-icon *ngIf="instance.component.tooltip" matSuffix matTooltip="{{ instance.component.tooltip }}">info</mat-icon>
      <mat-hint *ngIf="instance.component.description">{{ instance.component.description }}</mat-hint>
    </mat-form-field>
  `,
  styles: [
    '.mat-formio-textarea { width: 100%; }',
    '.editor-enabled label.mat-form-field-label { top: 0px; }'
  ],
  encapsulation: ViewEncapsulation.None
})
export class MaterialTextareaComponent extends MaterialComponent implements AfterViewInit {
  @ViewChild('textarea', {static: true}) textarea: ElementRef;
  ngAfterViewInit() {
    // Attach the element so the wysiwyg will work.
    this.instance.attachElement(this.textarea.nativeElement);
  }
}
TextAreaComponent.MaterialComponent = MaterialTextareaComponent;
export { TextAreaComponent };
