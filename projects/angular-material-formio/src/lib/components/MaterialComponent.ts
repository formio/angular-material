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
  public control: FormControl;
  setInstance(instance: any) {
    this.control = new FormControl();
    instance.materialComponent = this;
    this.instance = instance;
    this.renderComponents();
  }

  renderComponents() {}

  onChange() {
    this.instance.updateValue(this.control.value, {modified: true});
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
