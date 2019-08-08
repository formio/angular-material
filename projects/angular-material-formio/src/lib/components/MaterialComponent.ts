import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import FormioComponent from 'formiojs/components/_classes/component/Component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mat-formio-comp',
  template: '<mat-card>Unknown Component: {{ instance.component.type }}</mat-card>'
})
export class MaterialComponent implements AfterViewInit {
  @Input() instance: any;
  @ViewChild('input', {static: true}) input: ElementRef;
  public control: FormControl = new FormControl();
  setInstance(instance: any) {
    instance.materialComponent = this;
    this.instance = instance;
    this.renderComponents();
  }

  renderComponents() {}

  onChange() {
    this.instance.updateValue(this.getValue(), {modified: true});
  }

  getValue() {
    return this.control.value;
  }

  setValue(value) {
    this.control.setValue(value);
  }

  beforeSubmit() {
    this.control.markAsTouched();
  }

  ngAfterViewInit() {
    if (this.input) {
      // Set the input masks.
      this.instance.setInputMask(this.input.nativeElement);
    }
  }
}

FormioComponent.MaterialComponent = MaterialComponent;
export { FormioComponent };
