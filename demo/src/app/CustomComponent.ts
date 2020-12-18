/**
 * This file demonstrates how to create a custom component in Angular Material
 */
import { Components, MaterialComponent, registerComponent } from '@formio/angular-material';
import { Component } from '@angular/core';
@Component({
  template:'<b>My Custom Component</b>'
})
export class MaterialCustomComponent extends MaterialComponent {
  // Custom Material logic goes here.
}
registerComponent('my-custom-component', MaterialCustomComponent);
