import { Component } from '@angular/core';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import PanelComponent from 'formiojs/components/panel/Panel.js';
@Component({
  selector: 'mat-formio-panel',
  template: `
    <mat-card>
      <mat-card-title *ngIf="instance?.component?.title">{{ instance.component.title }}</mat-card-title>
      <mat-card-content fxLayout="column" fxLayoutGap="1em">
        <ng-template #components></ng-template>
      </mat-card-content>
    </mat-card>
  `,
  styles: []
})
export class MaterialPanelComponent extends MaterialNestedComponent {}
PanelComponent.MaterialComponent = MaterialPanelComponent;
export { PanelComponent };
