import { Component } from '@angular/core';
import ButtonComponent from 'formiojs/components/button/Button.js';
import { MaterialComponent } from '../MaterialComponent';
@Component({
  selector: 'mat-formio-button',
  template: `
    <button *ngIf="instance"
      type="{{ instance.component.action }}"
      mat-raised-button [color]="color"
      [disabled]="disabled"
      (click)="instance.onClick($event)"
    >
      <mat-icon *ngIf="done">done</mat-icon>
      <mat-icon *ngIf="error">close</mat-icon>
      <mat-icon class="mat-icon-spin" *ngIf="loading">autorenew</mat-icon>
      {{ instance.component.label }}
    </button>
  `,
  styles: ['@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } } ' +
    ':host .mat-icon-spin { ' +
      'animation-name: spin; ' +
      'animation-duration: 1000ms; ' +
      'animation-iteration-count: infinite; ' +
      'animation-timing-function: linear; ' +
    '}'
  ]
})
export class MaterialButtonComponent extends MaterialComponent {
  public loading = false;
  public done = false;
  public error = false;
  public disabled = false;
  public color = 'primary';
  getColor() {
    if (this.error) {
      return 'warn';
    }
    return this.instance.component.theme || 'primary';
  }
  setState(loading, error, done) {
    this.loading = loading;
    this.done = done;
    this.error = error;
    this.color = this.getColor();
  }
  setInstance(instance) {
    const retVal = super.setInstance(instance);
    this.disabled = instance.shouldDisabled;
    this.color = this.getColor();
    instance.on('submitButton', () => this.setState(true, false, false));
    instance.on('submitDone', () => this.setState(false, false, true));
    instance.on('submitError', () => this.setState(false, true, false));
    instance.on('requestButton', () => this.setState(true, false, false));
    instance.on('requestDone', () => this.setState(false, false, true));
    instance.on('change', (event) => {
      this.disabled = this.instance.component.shouldDisabled || (this.instance.component.disableOnInvalid && !event.isValid);
      if (event.isValid && this.loading) {
        this.loading = false;
        this.error = false;
      }
    });
    return retVal;
  }
}
ButtonComponent.MaterialComponent = MaterialButtonComponent;
export { ButtonComponent };
