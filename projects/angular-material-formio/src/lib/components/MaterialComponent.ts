import {Component, Input, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnInit} from '@angular/core';
import FormioComponent from 'formiojs/components/_classes/component/Component.js';
import { FormioControl } from '../FormioControl';

@Component({
  selector: 'mat-formio-comp',
  template: '<mat-card>Unknown Component: {{ instance.component.type }}</mat-card>'
})
export class MaterialComponent implements AfterViewInit, OnInit {
  @Input() instance: any;
  @ViewChild('input', {static: true}) input: ElementRef;
  @Input() control: FormioControl = new FormioControl();
  constructor(public element: ElementRef, public ref: ChangeDetectorRef) {}

  setInstance(instance: any) {
    this.instanceAllowDataInput(instance);
    this.control.setInstance(instance);
    instance.materialComponent = this;
    this.instance = instance;
    this.instance.disabled = this.instance.shouldDisabled;
    this.setVisible(this.instance.visible);
    this.renderComponents();
    this.onChange();
  }

  ngOnInit() {
    if (this.instance) {
      if (this.instance.parent.options.validateOnInit) {
        this.control.markAsTouched();
      }
      this.instance.component.defaultValue ? this.setValue(this.instance.component.defaultValue) : '';
    }
  }

  // Solves the problem with not setting submission data to some components
  instanceAllowDataInput(instance) {
    if (
      instance.component
      && instance.components
      && instance.components.length
      && !instance.isInputComponent
    ) {
      instance.component.input = true;
    }
  }

  renderComponents() {}

  onChange() {
    let value = this.getValue();

    if (value === undefined || value === null) {
      value = this.instance.emptyValue;
    }

    if (this.input && this.input.nativeElement.mask) {
      this.input.nativeElement.mask.textMaskInputElement.update(value);
      this.control.setValue(this.input.nativeElement.value);
    }
    this.instance.updateValue(value, {modified: true});
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

  setDisabled(disabled) {
    if (disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  setVisible(visible) {
    if (this.element && this.element.nativeElement) {
      if (visible) {
        this.element.nativeElement.removeAttribute('hidden');
        this.element.nativeElement.style.visibility = 'visible';
        this.element.nativeElement.style.position = 'relative';
      } else if (this.instance.parent.visible) {
        this.element.nativeElement.setAttribute('hidden', true);
        this.element.nativeElement.style.visibility = 'hidden';
        this.element.nativeElement.style.position = 'absolute';
      }
    }
  }

  ngAfterViewInit() {
    if (this.element && this.element.nativeElement && this.instance) {
      // Add custom classes to elements.
      if (this.instance.component.customClass) {
        this.element.nativeElement.classList.add(this.instance.component.customClass);
      }
    }

    if (this.input) {
      // Set the input masks.
      this.instance.setInputMask(this.input.nativeElement);
    }
  }
}

FormioComponent.MaterialComponent = MaterialComponent;
export { FormioComponent };
