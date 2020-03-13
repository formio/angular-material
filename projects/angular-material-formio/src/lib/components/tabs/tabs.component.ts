import { Component } from '@angular/core';
import { MaterialNestedComponent } from '../MaterialNestedComponent';
import TabsComponent from 'formiojs/components/tabs/Tabs.js';

@Component({
  selector: 'mat-formio-tabs',
  template: `
    <mat-tab-group>
      <mat-tab *ngFor="let tab of instance.component.components" [label]="tab.label">
        <div fxLayout="column" fxLayoutGap="1em" style="border: 1px dotted rgba(0, 0, 0, 0.125)">
          <ng-template #components></ng-template>
        </div>
      </mat-tab>
    </mat-tab-group>
  `
})
export class MaterialTabsComponent extends MaterialNestedComponent {
  setInstance(instance: any) {
    super.setInstance(instance);
    instance.viewContainer = (component) => {
      return this.viewContainers ? this.viewContainers[component.tab] : null;
    };
  }
}
TabsComponent.MaterialComponent = MaterialTabsComponent;
export { TabsComponent };
