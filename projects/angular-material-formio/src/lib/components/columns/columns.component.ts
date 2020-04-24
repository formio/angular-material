import { Component } from '@angular/core';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import ColumnsComponent from 'formiojs/components/columns/Columns.js';

@Component({
  selector: 'mat-formio-columns',
  template: `
    <div class="container"
         fxLayout="row"
         fxLayout.xs="column"
         fxLayoutWrap
         fxLayoutGap="{{ flexGap }}%"
         fxLayoutAlign="center"
    >
      <div
        *ngFor="let column of instance.component.columns; let i = index"
        [fxFlex]="flexWidth(column, i)"
        fxLayout="column"
        fxLayoutGap="1em">
        <ng-template #components></ng-template>
      </div>
    </div>
  `,
  styles: []
})
export class MaterialColumnsComponent extends MaterialNestedComponent {
  public flexGap = 0.5;
  public totalSpace = 0;
  setInstance(instance: any) {
    this.totalSpace = 100 - ((instance.component.columns.length - 1) * this.flexGap);
    super.setInstance(instance);
    instance.viewContainer = (component) => {
      return this.viewContainers ? this.viewContainers[component.column] : null;
    };
  }

  flexWidth(column, index) {
    if (index >= (this.instance.component.columns.length - 1)) {
      return Math.ceil(((parseFloat(column.width) / 12) * this.totalSpace)) + '%';
    } else {
      return Math.floor(((parseFloat(column.width) / 12) * this.totalSpace)) + '%';
    }
  }
}
ColumnsComponent.MaterialComponent = MaterialColumnsComponent;
export { ColumnsComponent };
