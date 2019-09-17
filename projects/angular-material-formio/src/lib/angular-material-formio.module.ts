import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatListModule,
  MatExpansionModule,
  MatCardModule,
  MatTabsModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import 'hammerjs';
import { FormioComponent } from './formio.component';
import { MaterialComponent } from './components/MaterialComponent';
import { MaterialNestedComponent } from './components/MaterialNestedComponent';
import { MaterialButtonComponent } from './components/button/button.component';
import { MaterialTextfieldComponent } from './components/textfield/textfield.component';
import { MaterialPasswordComponent } from './components/password/password.component';
import { MaterialEmailComponent } from './components/email/email.component';
import { MaterialPhoneNumberComponent } from './components/phonenumber/phonenumber.component';
import { MaterialNumberComponent } from './components/number/number.component';
import { MaterialCurrencyComponent } from './components/currency/currency.component';
import { MaterialTextareaComponent } from './components/textarea/textarea.component';
import { MaterialColumnsComponent } from './components/columns/columns.component';
import { MaterialContainerComponent } from './components/container/container.component';
import { MaterialCheckboxComponent } from './components/checkbox/checkbox.component';
import { MaterialFieldsetComponent } from './components/fieldset/fieldset.component';
import { MaterialContentComponent } from './components/content/content.component';
import { MaterialSignatureComponent } from './components/signature/signature.component';
import { MaterialSelectBoxesComponent } from './components/selectboxes/selectboxes.component';
import { MaterialRadioComponent } from './components/radio/radio.component';
import { MaterialSelectComponent } from './components/select/select.component';
import { MaterialPanelComponent } from './components/panel/panel.component';
import { MaterialTabsComponent } from './components/tabs/tabs.component';
import { MaterialDateComponent } from './components/date/date.component';
import { MaterialDataGridComponent } from './components/datagrid/datagrid.component';
import { MaterialEditGridComponent } from './components/editgrid/editgrid.component';
import { MaterialWellComponent } from './components/well/well.component';
import { FormioLoader } from 'angular-formio/components/loader/formio.loader';
import { RequiredDirective } from './required.directive';

@NgModule({
  declarations: [
    FormioComponent,
    MaterialButtonComponent,
    MaterialTextfieldComponent,
    MaterialPasswordComponent,
    MaterialEmailComponent,
    MaterialPhoneNumberComponent,
    MaterialNumberComponent,
    MaterialCurrencyComponent,
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
    MaterialSelectBoxesComponent,
    MaterialRadioComponent,
    MaterialSelectComponent,
    MaterialTabsComponent,
    MaterialDateComponent,
    MaterialWellComponent,
    MaterialComponent,
    MaterialNestedComponent,
    RequiredDirective
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    /*SatPopoverModule,*/
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
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
  exports: [
    FormioComponent,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
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
    MaterialEmailComponent,
    MaterialPhoneNumberComponent,
    MaterialNumberComponent,
    MaterialCurrencyComponent,
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
    MaterialSelectBoxesComponent,
    MaterialRadioComponent,
    MaterialSelectComponent,
    MaterialTabsComponent,
    MaterialDateComponent,
    MaterialWellComponent,
    MaterialComponent,
    MaterialNestedComponent
  ],
  providers: [
    FormioLoader
  ]
})
export class MatFormioModule { }
