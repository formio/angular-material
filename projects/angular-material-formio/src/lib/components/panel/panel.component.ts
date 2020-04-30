import { Component } from '@angular/core';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import PanelComponent from 'formiojs/components/panel/Panel.js';
@Component({
  selector: 'mat-formio-panel',
  template: `
    <mat-card *ngIf="!instance.component.collapsible">
      <mat-card-title *ngIf="instance?.component?.title">
        {{ instance.component.title }}
      </mat-card-title>
      <mat-card-content fxLayout="column" fxLayoutGap="1em">
        <ng-template #components></ng-template>
      </mat-card-content>
    </mat-card>
    <mat-expansion-panel *ngIf="instance.component.collapsible"
                         [expanded]="!instance.component.collapsed"
    >
      <mat-expansion-panel-header *ngIf="instance?.component?.title">
        <mat-panel-title>
          {{ instance.component.title }}
        </mat-panel-title>
      </mat-expansion-panel-header>
      <ng-template #components></ng-template>
    </mat-expansion-panel>
  `,
  styles: [
    ':host { margin-bottom: 1em; }'
  ]
})
export class MaterialPanelComponent extends MaterialNestedComponent {}
PanelComponent.MaterialComponent = MaterialPanelComponent;
export { PanelComponent };
