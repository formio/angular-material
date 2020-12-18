import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import HtmlComponent from 'formiojs/components/html/HTML.js';

@Component({
  selector: 'mat-formio-html',
  template: `<div #htmlBody></div>`
})
export class MaterialHtmlComponent extends MaterialComponent implements AfterViewInit {
  @ViewChild('htmlBody') htmlBody: ElementRef;

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.instance.component.refreshOnChange) {
      this.instance.checkRefreshOn = () => {
        this.htmlBody.nativeElement.innerHTML = this.instance.renderContent();
      };
    }
  }
}
HtmlComponent.MaterialComponent = MaterialHtmlComponent;
export { HtmlComponent };
