import { Directive, ElementRef, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import get from 'lodash/get';

@Directive({
  selector: '[matRequired]'
})
export class RequiredDirective implements AfterViewInit {
  @Input() component: any;
  constructor(public el: ElementRef, public cd: ChangeDetectorRef) {}
  ngAfterViewInit() {
    if (get(this.component, 'validate.required', false)) {
      this.el.nativeElement.setAttribute('required', '');
      this.cd.detectChanges();
    }
  }
}
