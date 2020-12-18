import { Component, OnInit } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import SelectComponent from 'formiojs/components/select/Select.js';
import _ from 'lodash';
@Component({
  selector: 'mat-formio-select',
  template: `
    <mat-formio-form-field [instance]="instance" [componentTemplate]="componentTemplate"></mat-formio-form-field>
    <ng-template #componentTemplate let-hasLabel>
      <mat-form-field fxFill>

        <mat-label *ngIf="hasLabel">
          <span [instance]="instance" matFormioLabel></span>
        </mat-label>

        <span *ngIf="instance.component.prefix" matPrefix>
          {{ instance.component.prefix }}&nbsp;
        </span>
        <mat-select
                [multiple]="instance.component.multiple"
                [formControl]="control"
                [placeholder]="instance.component.placeholder"
                (selectionChange)="onChange()"
                [compareWith]="compareObjects"
        >
          <div class="mat-option">
            <input class="mat-input-element" placeholder="Type to search" (input)="onFilter($event.target.value)">
          </div>
          <mat-option *ngIf="!filteredOptionsLength" disabled>
            <span>Nothing was found</span>
          </mat-option>
          <mat-option *ngFor="let option of filteredOptions | async" [value]="option.value">
            <span [innerHTML]="option.label"></span>
          </mat-option>
        </mat-select>

        <span *ngIf="instance.component.suffix" matSuffix>
          {{ instance.component.suffix }}
        </span>
        <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
      </mat-form-field>
    </ng-template>
  `
})
export class MaterialSelectComponent extends MaterialComponent implements OnInit {
  selectOptions: Promise<any[]>;
  filteredOptions: Promise<any[]>;
  filteredOptionsLength: number;
  
  selectOptionsResolve: any;

  setInstance(instance: any) {
    super.setInstance(instance);
    this.instance.triggerUpdate();
  }

  ngOnInit() {
    this.selectOptions = new Promise((resolve) => {
      this.selectOptionsResolve = resolve;
    });
    this.selectOptions.then((options) => {
      this.filteredOptionsLength = options.length;
    })

    this.filteredOptions = this.selectOptions;
  }

  onFilter(value) {
    this.filteredOptions = this.selectOptions.then((options) => {
      const filtered =  options.filter((option) => option.label.indexOf(value) !== -1);
      this.filteredOptionsLength = filtered.length;
      return filtered;
    })
  }

  compareObjects(o1: any, o2: any): boolean {
    return _.isEqual(o1, o2);
  }
}
SelectComponent.MaterialComponent = MaterialSelectComponent;

// Make sure we detect changes when new items make their way into the select dropdown.
const setItems = SelectComponent.prototype.setItems;
SelectComponent.prototype.setItems = function(...args) {
  setItems.call(this, ...args);
  if (this.materialComponent && this.materialComponent.selectOptionsResolve) {
    this.materialComponent.selectOptionsResolve(this.selectOptions);
  }
};

export { SelectComponent };
