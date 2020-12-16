import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import DataGridComponent from 'formiojs/components/datagrid/DataGrid.js';
import {CdkDragDrop, moveItemInArray, DragDropModule} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material/table';
@Component({
  selector: 'mat-formio-datagrid',
  template: `
    <mat-formio-form-field [instance]="instance"
                           [componentTemplate]="componentTemplate"
                           [labelTemplate]="labelTemplate"
    ></mat-formio-form-field>
    <ng-template #componentTemplate let-hasLabel>
      <mat-card fxFill>
        <ng-container *ngIf="hasLabel">
          <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
        </ng-container>
        <mat-card-content>
          <mat-card-actions
                  *ngIf="instance.hasAddButton() && (instance.component.addAnotherPosition === 'both' || instance.component.addAnotherPosition === 'top')">
            <button mat-raised-button color="primary" (click)="addAnother()">
              <mat-icon>add</mat-icon>
              {{instance.component.addAnother || 'Add Another'}}
            </button>
          </mat-card-actions>
          <table
                  mat-table
                  [dataSource]="dataSource"
                  class="mat-elevation-z8"
                  fxFill
                  cdkDropList
                  [cdkDropListData]="dataSource"
                  (cdkDropListDropped)="dropTable($event)">
            >
            <ng-container *ngFor="let column of formColumns" [matColumnDef]="column">
              <th mat-header-cell *matHeaderCellDef>{{ getColumnLabel(columns[column]) }}</th>
              <td mat-cell *matCellDef="let i = index;" [attr.rowIndex]="i" [attr.component]="column">
                <ng-template #components></ng-template>
              </td>
            </ng-container>
            <ng-container matColumnDef="__removeRow">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let i = index;">
                <button mat-button *ngIf="instance.hasRemoveButtons()" (click)="removeRow(i)">
                  <mat-icon aria-hidden="false" aria-label="Remove row">delete</mat-icon>
                </button>
              </td>
            </ng-container>
            <ng-container matColumnDef="position" *ngIf="instance.component.reorder">
              <th mat-header-cell *matHeaderCellDef> No.</th>
              <td mat-cell *matCellDef="let element">
                <mat-icon cdkDragHandle>reorder</mat-icon>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <div *ngIf="instance?.component?.reorder">
              <tr class="datagrid-row" mat-row *matRowDef="let row; columns: displayedColumns;" cdkDrag
                  [cdkDragData]="row"></tr>
            </div>
            <div *ngIf="!instance?.component?.reorder">
              <tr class="datagrid-row" mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </div>
          </table>
        </mat-card-content>
        <mat-card-actions *ngIf="instance.hasAddButton() && instance.component.addAnotherPosition !== 'top'">
          <button mat-raised-button color="primary" (click)="addAnother()">
            <mat-icon>add</mat-icon>
            {{instance.component.addAnother || 'Add Another'}}
          </button>
        </mat-card-actions>
      </mat-card>
    </ng-template>

    <ng-template #labelTemplate>
      <mat-card-title>
        <span [instance]="instance" matFormioLabel></span>
      </mat-card-title>
    </ng-template>
  `,
  styles: [
    '.datagrid-row { height: auto; }'
  ]
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
    if (this.instance.component.reorder) {
      this.displayedColumns.push('position');
    }
    instance.viewContainer = (component) => {
      let viewContainer;
      if (this.instance.component.disabled) {
        component.component.disabled = true;
      }
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
    this.checkRowsNumber();
    this.instance.addRow();
    if (this.dataSource.data.length < this.instance.rows.length) {
      this.dataSource.data.push({});
    }
    this.dataSource.data = [...this.dataSource.data];
  }

  checkRowsNumber() {
    while (this.instance.rows.length < this.dataSource.data.length) {
      this.instance.addRow();
    }
  }

  removeRow(index) {
    this.instance.removeRow(index);
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [...this.dataSource.data];
  }

  dropTable(event: CdkDragDrop<any>) {
    const prevIndex = this.dataSource.data.findIndex((d) => d === event.item.data);
    moveItemInArray(this.control.value, prevIndex, event.currentIndex);
    this.renderComponents();
  }

  renderComponents() {
    this.instance.getRows();
    this.instance.setValue(this.control.value || []);
  }

  setValue(value: [] | null) {
    const gridLength = value ? value.length : 0;

    while (this.instance.rows.length < gridLength) {
      this.addAnother();
      this.instance.dataValue = value;
      this.instance.setValue(value);
    }

    if (!value && this.instance.component.clearOnHide) {
      this.dataSource = new MatTableDataSource(this.instance.defaultValue);
    }
    super.setValue(value);
  }
}
DataGridComponent.MaterialComponent = MaterialDataGridComponent;
export { DataGridComponent };
