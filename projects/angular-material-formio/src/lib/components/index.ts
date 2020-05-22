const Components = require('formiojs/components/Components').default;
import Component from 'formiojs/components/_classes/component/Component.js';

import { TextFieldComponent } from './textfield/textfield.component';
import { PasswordComponent } from './password/password.component';
import { EmailComponent } from './email/email.component';
import { UrlComponent } from './url/url.component';
import { PhoneNumberComponent } from './phonenumber/phonenumber.component';
import { NumberComponent } from './number/number.component';
import { CurrencyComponent } from './currency/currency.component';
import { DayComponent } from './day/day.component';
import { HiddenComponent } from './hidden/hidden.component';
import { HtmlComponent } from './html/html.component';
import { TagsComponent } from './tags/tags.component';
import { ButtonComponent } from './button/button.component';
import { TextAreaComponent } from './textarea/textarea.component';
import { PanelComponent } from './panel/panel.component';
import { ColumnsComponent } from './columns/columns.component';
import { ContainerComponent } from './container/container.component';
import { TabsComponent } from './tabs/tabs.component';
import { DateTimeComponent } from './date/date.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FieldsetComponent } from './fieldset/fieldset.component';
import { ContentComponent } from './content/content.component';
import { SignatureComponent } from './signature/signature.component';
import { SurveyComponent } from './survey/survey.component';
import { SelectBoxesComponent } from './selectboxes/selectboxes.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { WellComponent } from './well/well.component';
import { DataGridComponent } from './datagrid/datagrid.component';
import { EditGridComponent } from './editgrid/editgrid.component';
import { TableComponent } from './table/table.component';
import { FormioComponent } from './MaterialComponent';
import { Wizard } from './formio.wizard';
import { TimeComponent } from './time/time.component'

// Set the components.
const components: any = {
  textfield: TextFieldComponent,
  password: PasswordComponent,
  url: UrlComponent,
  checkbox: CheckboxComponent,
  email: EmailComponent,
  phoneNumber: PhoneNumberComponent,
  number: NumberComponent,
  currency: CurrencyComponent,
  day: DayComponent,
  hidden: HiddenComponent,
  htmlelement: HtmlComponent,
  tags: TagsComponent,
  textarea: TextAreaComponent,
  button: ButtonComponent,
  datetime: DateTimeComponent,
  panel: PanelComponent,
  columns: ColumnsComponent,
  tabs: TabsComponent,
  table: TableComponent,
  well: WellComponent,
  fieldset: FieldsetComponent,
  content: ContentComponent,
  signature: SignatureComponent,
  survey: SurveyComponent,
  selectboxes: SelectBoxesComponent,
  radio: RadioComponent,
  select: SelectComponent,
  container: ContainerComponent,
  datagrid: DataGridComponent,
  editgrid: EditGridComponent,
  unknown: FormioComponent,
  time: TimeComponent,
  wizard: Wizard
};

export function getComponents() {
  for (const type of Object.keys(components)) {
    const CompClass = components[type];
    CompClass.prototype.render = (function () {
      if (this.materialComponent) {
        return this.materialComponent.renderComponents();
      }

      const viewContainer = this.parent ? this.parent.viewContainer(this) : this.viewContainer(this);
      if (!viewContainer) {
        return;
      }
      const factory = this.options.viewResolver.resolveComponentFactory(CompClass.MaterialComponent);
      const componentRef = viewContainer.createComponent(factory);
      (componentRef.instance as any).setInstance(this);
    });

    const setValue = CompClass.prototype.setValue;
    CompClass.prototype.setValue = (function (...args) {
      if (this.materialComponent) {
        this.materialComponent.setValue(args[0]);
      }
      return setValue.call(this, ...args);
    });

    components[type] = CompClass;
  }

  return components;
}

export function registerComponent(name: string, CompClass: any) {

  class DummyComponent extends Component {};
  const formIOComp = (DummyComponent as any);

  formIOComp.MaterialComponent = CompClass;
  formIOComp.prototype.render = (function () {
    if (this.materialComponent) {
      return this.materialComponent;
    }
    const viewContainer = this.parent ? this.parent.viewContainer(this) : this.viewContainer(this);
    if (!viewContainer) {
      return;
    }
    const factory = this.options.viewResolver.resolveComponentFactory(formIOComp.MaterialComponent);
    const componentRef = viewContainer.createComponent(factory);
    (componentRef.instance as any).setInstance(this);
  });

  const setValue = formIOComp.prototype.setValue;
  formIOComp.prototype.setValue = (function (...args) {
    if (this.materialComponent) {
      this.materialComponent.setValue(args[0]);
    }
    return setValue.call(this, ...args);
  });

  Components.addComponent(name, formIOComp);

}
