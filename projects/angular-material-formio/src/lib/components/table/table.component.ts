import { Component } from '@angular/core';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import TableComponent from 'formiojs/components/table/Table.js';

@Component({
  selector: 'mat-formio-table',
  template: `
    <table class="mat-table" style="width: 100%;">
      <thead>
        <tr class="mat-header-row">
          <th *ngFor="let header of instance.component.header" class="mat-header-cell">{{ instance.t(header) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of instance.table" role="row" class="mat-row">
          <td *ngFor="let col of row" role="gridcell" class="mat-cell"><ng-template #components></ng-template></td>
        </tr>
      </tbody>
    </table>
  `
})
export class MaterialTableComponent extends MaterialNestedComponent {
  setInstance(instance: any) {
    super.setInstance(instance);
    instance.viewContainer = (component) => {
      return this.viewContainers ?
        this.viewContainers[(component.tableRow * this.instance.component.numCols) + component.tableColumn] :
        null;
    };
  }
}
TableComponent.MaterialComponent = MaterialTableComponent;
export { TableComponent };
