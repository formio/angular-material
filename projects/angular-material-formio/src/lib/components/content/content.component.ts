import { Component } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import ContentComponent from 'formiojs/components/content/Content.js';
@Component({
  selector: 'mat-formio-content',
  template: `<div [innerHTML]="instance.content"></div>`
})
export class MaterialContentComponent extends MaterialComponent {}
ContentComponent.MaterialComponent = MaterialContentComponent;
export { ContentComponent };
