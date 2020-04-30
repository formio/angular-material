import { Component } from '@angular/core';
import FieldsetComponent from 'formiojs/components/fieldset/Fieldset.js';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
@Component({
  selector: 'mat-formio-fieldset',
  template: `
    <fieldset>
      <legend [attr.ref]="'header'">
        {{ instance.component.legend }}
        <mat-icon *ngIf="instance.component.tooltip"
                  matSuffix
                  matTooltip="{{ instance.component.tooltip }}"
        >
          info
        </mat-icon>
      </legend>
      <div class="fieldset-body" [attr.ref]="instance.component.key" fxLayout="column" fxLayoutGap="1em">
        <ng-template #components></ng-template>
      </div>
    </fieldset>
  `,
  styles: []
})
export class MaterialFieldsetComponent extends MaterialNestedComponent {}
FieldsetComponent.MaterialComponent = MaterialFieldsetComponent;
export { FieldsetComponent };
