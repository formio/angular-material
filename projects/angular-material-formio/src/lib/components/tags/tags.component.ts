import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import TagsComponent from 'formiojs/components/tags/Tags.js';
import { MaterialComponent } from '../MaterialComponent';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'mat-formio-tags',
  template: `
    <mat-formio-form-field [instance]="instance" [componentTemplate]="componentTemplate"></mat-formio-form-field>
    <ng-template #componentTemplate let-hasLabel>
      <mat-form-field class="example-chip-list" fxFill>

        <mat-label *ngIf="hasLabel">
          <span [instance]="instance" matFormioLabel></span>
        </mat-label>

        <mat-chip-list #chipList [attr.aria-label]="instance.component.label">
          <mat-chip *ngFor="let tag of tags; index as i;"
                    [selectable]="true"
                    [removable]="true"
                    (removed)="remove(i)"
          >
            {{tag}}
            <mat-icon matChipRemove>cancel</mat-icon>
          </mat-chip>

          <input [formControl]="control"
                 [matChipInputFor]="chipList"
                 [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                 [matChipInputAddOnBlur]="true"
                 (matChipInputTokenEnd)="add($event)"
          >
        </mat-chip-list>
      </mat-form-field>
    </ng-template>
  `
})
export class MaterialTagsComponent extends MaterialComponent {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.onChange();
  }

  remove(index): void {
    if (index >= 0 && index < this.tags.length) {
      this.tags.splice(index, 1);
    }
    this.onChange();
  }

  getValue() {
    return (this.instance.component.storeas === 'string') ? this.tags.join(this.instance.delimiter) : this.tags;
  }

  setValue(value) {
    if (typeof value === 'string') {
      value = value.split(this.instance.delimiter);
    }
    if (value && !Array.isArray(value)) {
      value = [value];
    }
    this.tags = value;
  }
}
(TagsComponent as any).MaterialComponent = MaterialTagsComponent;
export { TagsComponent };
