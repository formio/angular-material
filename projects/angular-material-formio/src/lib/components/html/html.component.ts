import { Component, AfterViewInit } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import HtmlComponent from 'formiojs/components/html/HTML.js';
@Component({
  selector: 'mat-formio-html',
  template: `<div></div>`
})
export class MaterialHtmlComponent extends MaterialComponent implements AfterViewInit {
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.element.nativeElement.innerHTML = this.instance.renderTemplate('html', {
      component: this.instance.component,
      tag: this.instance.component.tag,
      attrs: this.instance.component.attrs || {},
      content: this.instance.content,
    });
  }
}
HtmlComponent.MaterialComponent = MaterialHtmlComponent;
export { HtmlComponent };
