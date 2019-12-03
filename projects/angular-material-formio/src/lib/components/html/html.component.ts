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
    this.element.nativeElement.innerHTML = this.instance.renderContent();
  }

  setInstance(instance) {
    if (instance.component.refreshOnChange) {
      instance.checkRefreshOn = () => {
        this.element.nativeElement.innerHTML = instance.renderContent();
      };
    }
    return super.setInstance(instance);
  }
}
HtmlComponent.MaterialComponent = MaterialHtmlComponent;
export { HtmlComponent };
