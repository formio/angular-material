import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import HtmlComponent from 'formiojs/components/html/HTML.js';
import { LabelPositions } from "../../const/LabelPositions";

@Component({
  selector: 'mat-formio-html',
  template: `
    <mat-formio-form-field [instance]="instance"
                           [componentTemplate]="componentTemplate"
                           [renderTopLabel]="true"
    ></mat-formio-form-field>
    <ng-template #componentTemplate let-hasLabel>
      <div #htmlBody></div>
    </ng-template>
  `
})
export class MaterialHtmlComponent extends MaterialComponent implements AfterViewInit {
  labelPositions = LabelPositions;
  @ViewChild('htmlBody', {static: false}) htmlBody: ElementRef;

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.htmlBody.nativeElement.innerHTML = this.instance.renderContent();
  }

  setInstance(instance) {
    if (instance.component.refreshOnChange) {
      instance.checkRefreshOn = () => {
        this.htmlBody.nativeElement.innerHTML = instance.renderContent();
      };
    }
    return super.setInstance(instance);
  }
}
HtmlComponent.MaterialComponent = MaterialHtmlComponent;
export { HtmlComponent };
