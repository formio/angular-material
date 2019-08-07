import { Component } from '@angular/core';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import ContainerComponent from 'formiojs/components/container/Container';
@Component({
  selector: 'mat-formio-container',
  template: `<ng-template #components></ng-template>`
})
export class MaterialContainerComponent extends MaterialNestedComponent {}
ContainerComponent.MaterialComponent = MaterialContainerComponent;
export { ContainerComponent };
