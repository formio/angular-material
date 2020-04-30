/**
 * This file demonstrates how to create a custom component in Angular Material
 */
import { Components, MaterialHtmlComponent } from 'angular-material-formio';
import HtmlComponent from 'formiojs/components/html/HTML.js';
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
class HeaderComponent extends HtmlComponent {
  // Custom logic goes here.
}
@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: "mat-formio-comp",
    template: "<mat-card>Unknown Component: {{ instance.component.type }}</mat-card>"
})
export class MaterialHeaderComponent extends MaterialHtmlComponent {
  // Custom Material logic goes here.
}
(HeaderComponent as any).MaterialComponent = MaterialHeaderComponent;
Components.addComponent('header', HeaderComponent);
