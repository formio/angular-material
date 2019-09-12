import { Component, ViewChild, ElementRef, ComponentRef, ComponentFactory, ComponentFactoryResolver, Injector,  OnChanges, OnDestroy, DoCheck } from '@angular/core';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import { MatList, MatListItem } from '@angular/material';
import EditGridComponent from 'formiojs/components/editgrid/EditGrid';

const TEMPLATE_COMPONENTS: any = {
  'mat-list': MatList,
  'mat-list-item': MatListItem
};

@Component({
  selector: 'mat-formio-editgrid',
  template: `
    <mat-card fxFill>
      <mat-card-title *ngIf="instance?.component?.label">{{ instance.component.label }}</mat-card-title>
      <mat-card-content>
        <table mat-table [dataSource]="instance.editRows" fxFill>
          <ng-container *ngFor="let column of displayedColumns" [matColumnDef]="column">
            <th mat-header-cell *matHeaderCellDef>{{ columns[column].label }}</th>
            <td mat-cell *matCellDef="let i = index;" [attr.rowIndex]="i" [attr.component]="column">
              <ng-template #components></ng-template>
            </td>
          </ng-container>
          <ng-container matColumnDef="__editRow">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell></td>
            <!--<td mat-cell *matCellDef="let row" [satPopoverAnchorFor]="p" (click)="p.open()">
              <sat-popover #p
                 hasBackdrop
                 xAlign="start"
                 yAlign="start"
                 (closed)="update(element, $event)">
                <p>Testing</p>
              </sat-popover>
            </td>-->
          </ng-container>
          <ng-container matColumnDef="__removeRow">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let i = index;">
              <button mat-button><mat-icon aria-hidden="false" aria-label="Remove row" (click)="removeRow(i)">delete</mat-icon></button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns" #header></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          <tr mat-footer-row #footer></tr>
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
export class MaterialEditGridComponent extends MaterialNestedComponent implements OnDestroy {
  @ViewChild('header', { static: false }) headerElement: ElementRef;
  @ViewChild('footer', { static: false }) footerElement: ElementRef;
  public header: string;
  public footer: string;
  private componentRefs: Array<ComponentRef<any>> = [];
  public displayedColumns: string[];
  public columns: any = {};
  constructor(private cfr: ComponentFactoryResolver, private injector: Injector) {
    super();
  }

  setInstance(instance) {
    const dataValue = instance.dataValue || [];
    this.displayedColumns = instance.component.components.map((comp) => {
      if (comp.hasOwnProperty('tableView') && !comp.tableView) {
        return false;
      }

      this.columns[comp.key] = comp;
      return comp.key;
    }).filter(name => !!name);

    if (instance.component.templates && instance.component.templates.header) {
      this.header = instance.renderString(instance.component.templates.header, {
        components: instance.component.components,
        value: dataValue
      });
    }
    if (instance.component.templates && instance.component.templates.footer) {
      this.footer = instance.renderString(instance.component.templates.footer, {
        components: instance.component.components,
        value: dataValue
      });
    }
    super.setInstance(instance);
    setTimeout(() => {
      if (this.headerElement.nativeElement) {
        this.headerElement.nativeElement.innerHTML = this.header;
      }
      this.componentRefs = [];
      for (const selector in TEMPLATE_COMPONENTS) {
        if (TEMPLATE_COMPONENTS.hasOwnProperty(selector)) {
          if (this.headerElement.nativeElement) {
            const elements = (this.headerElement.nativeElement as Element).querySelectorAll(selector);
            Array.prototype.forEach.call(elements, (el: Element) => {
              const content = el.innerHTML;
              const factory: ComponentFactory<any> = this.cfr.resolveComponentFactory(TEMPLATE_COMPONENTS[selector]);
              const cmpRef = factory.create(this.injector, [], el);
              this.componentRefs.push(cmpRef);
            });
          }
        }
      }
    }, 0);
  }

  removeRow(index) {
    console.log('Remove Row');
  }

  addAnother() {
    this.instance.addRow();
  }

  ngOnDestroy() {
    this.componentRefs.forEach(ref => ref.destroy());
  }
}
EditGridComponent.MaterialComponent = MaterialEditGridComponent;
export { EditGridComponent };
