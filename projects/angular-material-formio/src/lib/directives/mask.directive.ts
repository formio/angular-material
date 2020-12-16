import { Directive, ElementRef, forwardRef, Input } from '@angular/core';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[matMask]',
  providers: [
    {provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: MaskDirective},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaskDirective),
      multi: true,
    }
  ]
})
export class MaskDirective {
  @Input('matMask') format: (value: string) => string;
  private _value: string | null;

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}


  get value(): string | null {
    return this._value;
  }

  @Input('value')
  set value(value: string | null) {
    this._value = value;
    this.formatValue(value);
  }

  private formatValue(value: string | null) {
    if (value !== null) {
      this.elementRef.nativeElement.value = this.format(value);
    }
    else {
      this.elementRef.nativeElement.value = '';
    }
  }

  _onChange(value: any): void {
  }

  writeValue(value: any) {
    this._value = value;
    this.formatValue(this._value); // format Value
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched() {
  }
}
