import { Component } from '@angular/core';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import ContainerComponent from 'formiojs/components/container/Container.js';
@Component({
  selector: 'mat-formio-container',
  template: `
    <div fxLayout="column" fxLayoutGap="1em">
      <ng-template #components></ng-template>
    </div>`
})
export class MaterialContainerComponent extends MaterialNestedComponent { }
ContainerComponent.MaterialComponent = MaterialContainerComponent;
export { ContainerComponent };
