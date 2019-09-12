import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import DataGridComponent from 'formiojs/components/datagrid/DataGrid';

@Component({
  selector: 'mat-formio-datagrid',
  template: `
    <mat-card fxFill>
      <mat-card-title *ngIf="instance?.component?.label">{{ instance.component.label }}</mat-card-title>
      <mat-card-content>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" fxFill>
          <ng-container *ngFor="let column of formColumns" [matColumnDef]="column">
            <th mat-header-cell *matHeaderCellDef>{{ getColumnLabel(columns[column]) }}</th>
            <td mat-cell *matCellDef="let i = index;" [attr.rowIndex]="i" [attr.component]="column">
              <ng-template #components></ng-template>
            </td>
          </ng-container>
          <ng-container matColumnDef="__removeRow">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let i = index;">
              <button mat-button><mat-icon aria-hidden="false" aria-label="Remove row" (click)="removeRow(i)">delete</mat-icon></button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="addAnother()">
          <mat-icon>add</mat-icon> Add Another
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class MaterialDataGridComponent extends MaterialNestedComponent {
  displayedColumns: string[];
  formColumns: string[];
  columns: any;
  dataSource = new MatTableDataSource();

  getColumnLabel(column) {
    return column.label || column.key;
  }

  setInstance(instance: any) {
    super.setInstance(instance);
    this.dataSource.data = instance.dataValue;
    this.columns = {};
    this.displayedColumns = [];
    this.formColumns = [];
    instance.getColumns().map((column) => {
      this.formColumns.push(column.key);
      this.displayedColumns.push(column.key);
      this.columns[column.key] = column;
    });
    this.displayedColumns.push('__removeRow');
    instance.viewContainer = (component) => {
      let viewContainer;
      this.viewContainers.forEach((container) => {
        const td = container.element.nativeElement.parentNode;
        if (
          component.rowIndex === parseInt(td.getAttribute('rowIndex'), 10) &&
          component.component.key === td.getAttribute('component')
        ) {
          viewContainer = container;
        }
      });

      return viewContainer ? viewContainer : null;
    };
  }

  addAnother() {
    this.instance.addRow();
    this.dataSource.data = this.instance.dataValue;
  }

  removeRow(index) {
    this.instance.removeRow(index);
    this.dataSource.data = this.instance.dataValue;
  }

  renderComponents() {
    this.instance.getRows();
  }
}
DataGridComponent.MaterialComponent = MaterialDataGridComponent;
export { DataGridComponent };
