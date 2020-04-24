import { AfterViewInit, Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldControl } from "@angular/material/form-field";

@Component({
  selector: 'mat-formio-form-field',
  templateUrl: './formio-form-field.component.html',
  styleUrls: ['./formio-form-field.component.css']
})
export class FormioFormFieldComponent implements OnInit {
  private _instance;

  @Input('instance')
  set instance(instance) {
    this._instance = instance;
    this.componentTemplateContext = {$implicit: this.hasLabel('top')};
  }

  get instance() {
    return this._instance;
  }

  @Input() componentTemplate: TemplateRef<any>;
  componentTemplateContext;

  constructor() { }

  ngOnInit() {
  }

  hasLabel(labelPosition?: string) {
    const { component } = this.instance;
    if (!component.label || component.hideLabel) {
      return false;
    }
    if (!labelPosition && !component.labelPosition) {
      return true;
    }
    if (component.labelPosition === labelPosition) {
      return true;
    }
  }
}
