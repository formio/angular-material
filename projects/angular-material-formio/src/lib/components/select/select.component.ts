import { Component, OnInit } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import SelectComponent from 'formiojs/components/select/Select.js';
@Component({
  selector: 'mat-formio-select',
  template: `
    <mat-form-field fxFill>
      <mat-label>{{ instance.component.label }}</mat-label>
      <span *ngIf="instance.component.prefix" matPrefix>{{ instance.component.prefix }}&nbsp;</span>
      <mat-select
        [multiple]="instance.component.multiple"
        [formControl]="control"
        [placeholder]="instance.component.placeholder"
        (selectionChange)="onChange()">
        <div class="mat-option">
          <input class="mat-input-element" placeholder="Type to search" (input)="onFilter($event.target.value)">
        </div>
        <mat-option></mat-option>
        <mat-option *ngFor="let option of filteredOptions | async" [value]="option.value">
          <span [innerHTML]="option.label"></span>
        </mat-option>
      </mat-select>
      <span *ngIf="instance.component.suffix" matSuffix>{{ instance.component.suffix }}</span>
      <mat-icon *ngIf="instance.component.tooltip" matSuffix matTooltip="{{ instance.component.tooltip }}">info</mat-icon>
      <mat-hint *ngIf="instance.component.description">{{ instance.component.description }}</mat-hint>
      <mat-error *ngIf="instance.error">{{ instance.error.message }}</mat-error>
    </mat-form-field>
  `
})
export class MaterialSelectComponent extends MaterialComponent implements OnInit {
  selectOptions: Promise<any[]>;
  filteredOptions: Promise<any[]>;

  selectOptionsResolve: any;
  setInstance(instance: any) {
    super.setInstance(instance);
    this.instance.triggerUpdate();
  }

  ngOnInit() {
    this.selectOptions = new Promise((resolve) => {
      this.selectOptionsResolve = resolve;
    });

    this.filteredOptions = this.selectOptions;
  }

  onFilter(value) {
    this.filteredOptions = this.selectOptions.then((options) => {
      return options.filter((option) => option.label.indexOf(value) !== -1)
    })
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
