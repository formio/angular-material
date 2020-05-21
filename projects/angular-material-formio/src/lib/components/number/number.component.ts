import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { MaterialTextfieldComponent, TEXTFIELD_TEMPLATE } from '../textfield/textfield.component';
import NumberComponent from 'formiojs/components/number/Number.js';
import _ from 'lodash';

@Component({
  selector: 'mat-formio-number',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialNumberComponent extends MaterialTextfieldComponent implements AfterViewInit {
  public inputType = 'text';

  constructor(public element: ElementRef, public ref: ChangeDetectorRef, private renderer: Renderer2) {
    super(element, ref);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.instance) {
      const { instance } = this;

        this.renderer.listen(this.input.nativeElement, 'blur', () => {
          this.control.setValue(instance.getValueAsString(instance.formatValue(instance.parseValue(this.control.value))));
        });

    }
  }

  getValue() {
    return this.instance && !_.isNil(this.control.value) ? this.instance.parseNumber(this.control.value) : this.control.value;
  }

  setValue(value) {
    if (this.instance) {
      const { instance } = this;
      value = instance.formatValue(instance.parseValue(value));
    }
    else {
      value = value.toString();
    }

    return super.setValue(value);
  }
}
NumberComponent.MaterialComponent = MaterialNumberComponent;
export { NumberComponent };
