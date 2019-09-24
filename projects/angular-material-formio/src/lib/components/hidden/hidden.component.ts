import { Component } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import HiddenComponent from 'formiojs/components/hidden/Hidden.js';
@Component({
  selector: 'mat-formio-hidden',
  template: `<input matInput type="hidden" [formControl]="control" #input>`
})
export class MaterialHiddenComponent extends MaterialComponent {}
HiddenComponent.MaterialComponent = MaterialHiddenComponent;
export { HiddenComponent };
