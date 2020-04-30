import { Component } from '@angular/core';
import WellComponent from 'formiojs/components/well/Well.js';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
@Component({
  selector: 'mat-formio-well',
  template: `
    <mat-card>
      <mat-card-content fxLayout="column"
                        fxLayoutGap="1em"
                        [ngStyle]="{
                           'background-color':'#f5f5f5',
                           'padding': '1.5em'
                         }"
      >
        <ng-template #components></ng-template>
      </mat-card-content>
    </mat-card>
  `,
  styles: []
})
export class MaterialWellComponent extends MaterialNestedComponent {}
WellComponent.MaterialComponent = MaterialWellComponent;
export { WellComponent };
