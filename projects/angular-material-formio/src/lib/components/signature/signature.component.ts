import { Component, ViewChild, ElementRef } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import SignatureComponent from 'formiojs/components/signature/Signature.js';
@Component({
  selector: 'mat-formio-signature',
  template: `<div #signature>
    <button mat-icon-button [ngStyle]="{position: 'absolute'}" ref="refresh"><mat-icon>refresh</mat-icon></button>
    <div class="signature-pad-body" [ngStyle]="{width: instance.component.width, height: instance.component.height, padding: 0, margin: 0}"
      [attr.tabindex]="instance.component.tabindex || 0"
      ref="padBody">
      <canvas class="signature-pad-canvas" [attr.height]="instance.component.height" ref="canvas"></canvas>
      <img fxFlexFill [ngStyle]="{display: 'none' }" ref="signatureImage">
    </div>
    <div *ngIf="instance.component.footer" class="signature-pad-footer" fxLayout="row" fxLayoutAlign="center center">
      <mat-hint>{{ instance.t(instance.component.footer) }}</mat-hint>
    </div>
  </div>`
})
export class MaterialSignatureComponent extends MaterialComponent {
  @ViewChild('signature', {static: true}) signatureElement: ElementRef;
  renderComponents() {
    this.instance.attach(this.signatureElement.nativeElement);
  }
}
SignatureComponent.MaterialComponent = MaterialSignatureComponent;
export { SignatureComponent };
