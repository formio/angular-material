import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';

import { initRenderer } from './renderer';
import { FormioComponent } from './formio.component';
import { MaterialComponent } from './components/MaterialComponent';
import { MaterialNestedComponent } from './components/MaterialNestedComponent';
import { MaterialButtonComponent } from './components/button/button.component';
import { MaterialTextfieldComponent } from './components/textfield/textfield.component';
import { MaterialPasswordComponent } from './components/password/password.component';
import { MaterialUrlComponent } from './components/url/url.component';
import { MaterialEmailComponent } from './components/email/email.component';
import { MaterialPhoneNumberComponent } from './components/phonenumber/phonenumber.component';
import { MaterialNumberComponent } from './components/number/number.component';
import { MaterialHiddenComponent } from './components/hidden/hidden.component';
import { MaterialHtmlComponent } from './components/html/html.component';
import { MaterialTagsComponent } from './components/tags/tags.component';
import { MaterialCurrencyComponent } from './components/currency/currency.component';
import { MaterialDayComponent } from './components/day/day.component';
import { MaterialTextareaComponent } from './components/textarea/textarea.component';
import { MaterialColumnsComponent } from './components/columns/columns.component';
import { MaterialContainerComponent } from './components/container/container.component';
import { MaterialCheckboxComponent } from './components/checkbox/checkbox.component';
import { MaterialFieldsetComponent } from './components/fieldset/fieldset.component';
import { MaterialContentComponent } from './components/content/content.component';
import { MaterialSignatureComponent } from './components/signature/signature.component';
import { MaterialSurveyComponent } from './components/survey/survey.component';
import { MaterialSelectBoxesComponent } from './components/selectboxes/selectboxes.component';
import { MaterialRadioComponent } from './components/radio/radio.component';
import { MaterialSelectComponent } from './components/select/select.component';
import { MaterialPanelComponent } from './components/panel/panel.component';
import { MaterialTabsComponent } from './components/tabs/tabs.component';
import { MaterialTableComponent } from './components/table/table.component';
import { MaterialDateComponent } from './components/date/date.component';
import { MaterialDataGridComponent } from './components/datagrid/datagrid.component';
import { MaterialEditGridComponent } from './components/editgrid/editgrid.component';
import { MaterialWellComponent } from './components/well/well.component';
import { MaterialWizardComponent } from './components/formio.wizard';
import { MaterialTimeComponent } from './components/time/time.component';
import { MaterialCalendarComponent } from './components/calendar/calendar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormioFormFieldComponent } from './components/formio-form-field/formio-form-field.component';
import { LabelComponent } from './components/label/label.component';
import { MaskDirective } from './directives/mask.directive';

export {
  FormioComponent,
  MaterialButtonComponent,
  MaterialTextfieldComponent,
  MaterialPasswordComponent,
  MaterialUrlComponent,
  MaterialEmailComponent,
  MaterialPhoneNumberComponent,
  MaterialNumberComponent,
  MaterialCurrencyComponent,
  MaterialDayComponent,
  MaterialHiddenComponent,
  MaterialHtmlComponent,
  MaterialTagsComponent,
  MaterialTableComponent,
  MaterialTextareaComponent,
  MaterialColumnsComponent,
  MaterialContainerComponent,
  MaterialDataGridComponent,
  MaterialEditGridComponent,
  MaterialPanelComponent,
  MaterialCheckboxComponent,
  MaterialFieldsetComponent,
  MaterialContentComponent,
  MaterialSignatureComponent,
  MaterialSurveyComponent,
  MaterialSelectBoxesComponent,
  MaterialRadioComponent,
  MaterialSelectComponent,
  MaterialTabsComponent,
  MaterialDateComponent,
  MaterialWellComponent,
  MaterialComponent,
  MaterialNestedComponent,
  MaterialTimeComponent
};

@NgModule({
  declarations: [
    FormioComponent,
    MaterialButtonComponent,
    MaterialTextfieldComponent,
    MaterialPasswordComponent,
    MaterialUrlComponent,
    MaterialEmailComponent,
    MaterialPhoneNumberComponent,
    MaterialNumberComponent,
    MaterialCurrencyComponent,
    MaterialDayComponent,
    MaterialHiddenComponent,
    MaterialHtmlComponent,
    MaterialTagsComponent,
    MaterialTextareaComponent,
    MaterialColumnsComponent,
    MaterialContainerComponent,
    MaterialDataGridComponent,
    MaterialEditGridComponent,
    MaterialPanelComponent,
    MaterialCheckboxComponent,
    MaterialFieldsetComponent,
    MaterialContentComponent,
    MaterialSignatureComponent,
    MaterialSurveyComponent,
    MaterialSelectBoxesComponent,
    MaterialRadioComponent,
    MaterialSelectComponent,
    MaterialTabsComponent,
    MaterialTableComponent,
    MaterialDateComponent,
    MaterialWellComponent,
    MaterialWizardComponent,
    MaterialComponent,
    MaterialNestedComponent,
    MaterialTimeComponent,
    MaterialCalendarComponent,
    FormioFormFieldComponent,
    LabelComponent,
    MaskDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
    MatChipsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    DragDropModule
  ],
  exports: [
    FormioComponent,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
    MatChipsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule
  ],
  entryComponents: [
    MaterialButtonComponent,
    MaterialTextfieldComponent,
    MaterialPasswordComponent,
    MaterialUrlComponent,
    MaterialEmailComponent,
    MaterialPhoneNumberComponent,
    MaterialNumberComponent,
    MaterialCurrencyComponent,
    MaterialDayComponent,
    MaterialHiddenComponent,
    MaterialHtmlComponent,
    MaterialTagsComponent,
    MaterialTextareaComponent,
    MaterialColumnsComponent,
    MaterialContainerComponent,
    MaterialDataGridComponent,
    MaterialEditGridComponent,
    MaterialPanelComponent,
    MaterialCheckboxComponent,
    MaterialFieldsetComponent,
    MaterialContentComponent,
    MaterialSignatureComponent,
    MaterialSurveyComponent,
    MaterialSelectBoxesComponent,
    MaterialRadioComponent,
    MaterialSelectComponent,
    MaterialTabsComponent,
    MaterialTableComponent,
    MaterialDateComponent,
    MaterialWellComponent,
    MaterialComponent,
    MaterialNestedComponent,
    MaterialTimeComponent,
    MaterialWizardComponent
  ],
  providers: []
})
export class MatFormioModule {
  constructor() {
    initRenderer();
  }
}
export * from './renderer';
