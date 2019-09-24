import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import HtmlComponent from 'formiojs/components/html/HTML.js';
@Component({
  selector: 'mat-formio-html',
  template: `<div #element></div>`
})
export class MaterialHtmlComponent extends MaterialComponent implements AfterViewInit {
  @ViewChild('element', {static: true}) element: ElementRef;
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.element.nativeElement.innerHTML = this.instance.renderTemplate('html', {
      component: this.instance.component,
      tag: this.instance.component.tag,
      attrs: this.instance.component.attrs || {},
      content: this.instance.content,
    });
    this.instance.attach(this.element.nativeElement);
  }
}
HtmlComponent.MaterialComponent = MaterialHtmlComponent;
export { HtmlComponent };
