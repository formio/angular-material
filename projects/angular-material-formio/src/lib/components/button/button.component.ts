import { Component } from '@angular/core';
import ButtonComponent from 'formiojs/components/button/Button';
import { MaterialComponent } from '../MaterialComponent';
@Component({
  selector: 'mat-formio-button',
  template: `
    <button
      type="{{ instance.component.action }}"
      mat-raised-button color="{{ instance.component.theme || 'primary' }}"
      (click)="instance.onClick($event)">{{ instance.component.label }}
    </button>
  `,
  styles: [':host > * { width: 100%; }']
})
export class MaterialButtonComponent extends MaterialComponent {}
ButtonComponent.MaterialComponent = MaterialButtonComponent;
export { ButtonComponent };
