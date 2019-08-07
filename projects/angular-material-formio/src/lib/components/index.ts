import './Base';
import { TextFieldComponent } from './textfield/textfield.component';
import { ButtonComponent } from './button/button.component';
import { TextAreaComponent } from './textarea/textarea.component';
import { PanelComponent } from './panel/panel.component';
import { ColumnsComponent } from './columns/columns.component';
import { ContainerComponent } from './container/container.component';
import { TabsComponent } from './tabs/tabs.component';
import { DateTimeComponent } from './date/date.component';
import { WellComponent } from './well/well.component';
import { DataGridComponent } from './datagrid/datagrid.component';
import { FormioComponent } from './MaterialComponent';

// Set the components.
const components: any = {
  textfield: TextFieldComponent,
  textarea: TextAreaComponent,
  button: ButtonComponent,
  datetime: DateTimeComponent,
  panel: PanelComponent,
  columns: ColumnsComponent,
  tabs: TabsComponent,
  well: WellComponent,
  container: ContainerComponent,
  datagrid: DataGridComponent,
  unknown: FormioComponent
};

// Decorate each component.
for (const type in components) {
  if (components.hasOwnProperty(type)) {
    const CompClass = components[type];
    CompClass.prototype.render = function() {
      if (this.materialComponent) {
        return this.materialComponent.renderComponents();
      }

      const viewContainer = this.parent.viewContainer(this);
      if (!viewContainer) {
        return;
      }
      const factory = this.options.viewResolver.resolveComponentFactory(CompClass.MaterialComponent);
      const componentRef =  viewContainer.createComponent(factory);
      (componentRef.instance as any).setInstance(this);
    };
  }
}

export default components;
