/**
 * This file demonstrates how to create a custom component in Angular Material
 */
import { Components, MaterialHtmlComponent } from 'angular-material-formio';
import HtmlComponent from 'formiojs/components/html/HTML.js';
class HeaderComponent extends HtmlComponent {
  // Custom logic goes here.
}
export class MaterialHeaderComponent extends MaterialHtmlComponent {
  // Custom Material logic goes here.
}
(HeaderComponent as any).MaterialComponent = MaterialHeaderComponent;
Components.addComponent('header', HeaderComponent);
