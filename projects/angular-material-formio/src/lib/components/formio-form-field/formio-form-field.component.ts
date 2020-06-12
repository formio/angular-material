import { Component, Input, TemplateRef } from '@angular/core';
import { LabelPositions } from '../../const/LabelPositions';

@Component({
  selector: 'mat-formio-form-field',
  templateUrl: './formio-form-field.component.html',
  styleUrls: ['./formio-form-field.component.css']
})
export class FormioFormFieldComponent {
  private _instance;
  public labelPositions = LabelPositions;
  @Input() labelTemplate: TemplateRef<any>;
  @Input() renderTopLabel = false;
  @Input() showDescription = true;
  @Input() renderElementOnly = false;

  @Input('instance')
  set instance(instance) {
    this._instance = instance;
    if (instance) {
      this.componentTemplateContext = {$implicit: this.hasLabel(['top'])};
    }
  }

  get instance() {
    return this._instance;
  }

  @Input() componentTemplate: TemplateRef<any>;
  componentTemplateContext;

  hasLabel(labelPositions?: string[]) {
    const { component } = this.instance;
    const hasNoLabel = !component.label || component.hideLabel;
    const labelPositionIsNotSpecified = !labelPositions ||
                                        !labelPositions.length ||
                                        !component.labelPosition;

    if (hasNoLabel || labelPositionIsNotSpecified || this.renderElementOnly) {
      return false;
    }

    if (labelPositions.includes(component.labelPosition)) {
      return true;
    }
  }
}
