import { Component } from '@angular/core';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import TableComponent from 'formiojs/components/table/Table.js';

@Component({
  selector: 'mat-formio-table',
  styleUrls: [ './table.component.css' ],
  template: `
      <table class="mat-table" style="width: 100%;" [ngClass]="{'is-bordered' : instance.component.bordered}">
        <thead>
        <tr class="mat-header-row">
          <th *ngFor="let header of instance.component.header"
              class="mat-header-cell"
          >
            {{ instance.t(header) }}
          </th>
        </tr>
        </thead>

        <tbody>
        <tr *ngFor="let row of instance.table; let i = index"
            role="row"
            class="mat-row"
            [ngClass]="{
                'is-hover': instance.component.hover,
                'is-striped': instance.component.striped && i % 2 === 0
              }"
        >
          <td *ngFor="let col of row"
              role="gridcell"
              class="mat-cell"
              [ngClass]="getTableColClasses()"
          >
            <ng-template #components></ng-template>
          </td>
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

  getTableColClasses() {
    if (!this.instance) {
      return;
    }
    const {condensed, cellAlignment} = this.instance.component;
    return {
      'is-condensed': condensed,
      ...(cellAlignment && {[cellAlignment]: true})
    }
  }
}
TableComponent.MaterialComponent = MaterialTableComponent;
export { TableComponent };
