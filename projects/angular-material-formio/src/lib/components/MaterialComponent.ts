import {Component, Input, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnInit} from '@angular/core';
import FormioComponent from './Base';
import Validator from 'formiojs/validator/Validator.js';
import { FormioControl } from '../FormioControl';
import get from 'lodash/get';

@Component({
  selector: 'mat-formio-comp',
  template: '<mat-card>Unknown Component: {{ instance.component.type }}</mat-card>'
})
export class MaterialComponent implements AfterViewInit, OnInit {
  @Input() instance: any;
  @ViewChild('input') input: ElementRef;
  @Input() control: FormioControl = new FormioControl();
  constructor(public element: ElementRef, public ref: ChangeDetectorRef) {}

  setInstance(instance: any) {
    this.control.setInstance(instance);
    instance.materialComponent = this;
    this.instance = instance;
    this.instance.disabled = this.instance.shouldDisabled;
    this.setVisible(this.instance.visible);
    this.renderComponents();
  }

  ngOnInit() {
    if (this.instance) {
      if (this.shouldValidateOnInit()) {
        this.storeFormData();
        this.validateOnInit();
      }
      this.instance.component.defaultValue ? this.setValue(this.instance.component.defaultValue) : '';
    }
  }

  validateOnInit() {
    const {key} = this.instance.component;
    const validationValue = this.getFormValue(this.instance.path);

    if (validationValue === null) {
      return;
    }

    this.instance.setPristine(false);

    const validationResult = Validator.checkComponent(
      this.instance,
      {[key]: validationValue},
      {[key]: validationValue}
    );

    if (validationResult.length) {
      this.instance.setCustomValidity(validationResult, false);
      if (!!validationValue) {
        this.control.markAsTouched();
      }
      this.ref.detectChanges();
    }
  }

  storeFormData() {
    if (this.instance.parent && this.instance.parent.submission && this.instance.parent.submission.data) {
      sessionStorage.setItem('formData', JSON.stringify(this.instance.parent.submission.data));
    }
  }

  getFormValue(path) {
    const formData = JSON.parse(sessionStorage.getItem('formData'));

    if (!formData) {
      return null;
    }

    return get(formData, path);
  }

  renderComponents() {}

  onChange(keepInputRaw?: boolean) {
    let value = this.getValue();

    if (value === undefined || value === null) {
      value = this.instance.emptyValue;
    }

    if (this.input && this.input.nativeElement.mask && value && !keepInputRaw) {
      this.input.nativeElement.mask.textMaskInputElement.update(value);
      this.control.setValue(this.input.nativeElement.value);
      value = this.getValue();
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

  hasError() {
    return !!this.instance && !!this.instance.error;
  }

  shouldValidateOnInit() {
    if (!this.instance) {
      return;
    }

    return this.instance.options.validateOnInit
      || this.instance.parent.options.validateOnInit;
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
      } else {
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
      this.instance.addFocusBlurEvents(this.input.nativeElement);
    }
  }
}

FormioComponent.MaterialComponent = MaterialComponent;
export { FormioComponent };
