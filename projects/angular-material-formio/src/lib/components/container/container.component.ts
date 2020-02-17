import { Component } from '@angular/core';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import ContainerComponent from 'formiojs/components/container/Container.js';
@Component({
  selector: 'mat-formio-container',
  template: `
    <div fxLayout="column" fxLayoutGap="1em">
      <mat-label *ngIf="getLabelPosition() === 'top'">
        {{ instance.component.label }}
      </mat-label>
      <ng-template #components></ng-template>
      <mat-label *ngIf="getLabelPosition() === 'bottom'">
        {{ instance.component.label }}
      </mat-label>
    </div>`
})
export class MaterialContainerComponent extends MaterialNestedComponent {
  getLabelPosition() {
    if (this.instance.component && !this.instance.component.hideLabel && this.instance.component.label) {
      return this.instance.component.labelPosition === 'bottom' ? 'bottom' : 'top';
    }
    return null;
  }
}
ContainerComponent.MaterialComponent = MaterialContainerComponent;
export { ContainerComponent };
