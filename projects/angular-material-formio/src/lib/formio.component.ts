import { Component, Optional, ChangeDetectorRef, ViewContainerRef, ViewChild, ComponentFactoryResolver, NgZone, Input, Output } from '@angular/core';
import { FormioAppConfig, FormioBaseComponent } from '@formio/angular';
import { Form } from './renderer';
import { get } from 'lodash';
@Component({
  selector: 'mat-formio',
  styles: [
    `.alert-danger {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }
    .alert-success {
      color: #155724;
      background-color: #d4edda;
      border-color: #c3e6cb;
    }
    .alert {
      position: relative;
      padding: .75rem 1.25rem;
      margin-bottom: 0.5rem;
      border: 1px solid transparent;
      border-radius: .25rem;
    }
    ::ng-deep mat-card {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    `
  ],
  template: `
    <mat-spinner *ngIf="isLoading"></mat-spinner>
    <div *ngIf="!this.options?.disableAlerts">
      <div *ngFor="let alert of alerts.alerts"
           class="alert alert-{{ alert.type }}"
           role="alert"
      >
        {{ alert.message }}
      </div>
    </div>
    <div fxLayout="column" fxLayoutGap="1em">
      <ng-template #formio></ng-template>
    </div>
  `
})
export class FormioComponent extends FormioBaseComponent {
  @ViewChild('formio', {static: true, read: ViewContainerRef}) formioViewContainer: ViewContainerRef;
  constructor(
    private resolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    public ngZone: NgZone,
    @Optional() public config: FormioAppConfig
  ) {
    super(ngZone, config);
  }

  getRendererOptions(): any {
    const rendererOptions = super.getRendererOptions();
    return {...rendererOptions, validateOnInit: get(rendererOptions, 'validateOnInit', true) }
  }

  createRenderer() {
    const options = this.getRendererOptions();
    const flags = {
      validateOnInit: options.validateOnInit
    };
    options.viewResolver = this.resolver;
    const form = new Form();
    form._form = this.form;
    form.options = options;
    form.options.events = form.events;
    form.instance = form.create(this.form.display);
    form.instance.viewContainer = () => this.formioViewContainer;
    if (this.submission && this.submission.data) {
      form.instance.data = this.submission.data;
    }
    this.ngZone.run(() => form.instance.setForm(this.form, flags)
      .then(() => form.readyResolve(form.instance))
      .catch(() => form.readyReject())
    );
    return form.instance;
  }
}
