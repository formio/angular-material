import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MaterialComponent } from '../MaterialComponent';
import SignatureComponent from 'formiojs/components/signature/Signature.js';
@Component({
  selector: 'mat-formio-signature',
  template: `
    <mat-formio-form-field [instance]="instance" [componentTemplate]="componentTemplate"></mat-formio-form-field>
    <ng-template #componentTemplate let-hasLabel>
      <div #signature>

        <mat-label *ngIf="hasLabel">
          <span [instance]="instance" matFormioLabel></span>
        </mat-label>

        <button mat-icon-button [ngStyle]="{position: 'absolute'}" ref="refresh">
          <mat-icon>refresh</mat-icon>
        </button>

        <div class="signature-pad-body"
             [ngStyle]="{width: instance.component.width, height: instance.component.height, padding: 0, margin: 0}"
             [attr.tabindex]="instance.component.tabindex || 0"
             ref="padBody"
        >
          <canvas class="signature-pad-canvas"
                  [attr.height]="instance.component.height"
                  ref="canvas"
          ></canvas>
          <img fxFlexFill [ngStyle]="{display: 'none' }" ref="signatureImage">
        </div>
        <div *ngIf="instance.component.footer"
             class="signature-pad-footer"
             fxLayout="row"
             fxLayoutAlign="center center"
        >
          <mat-hint>{{ instance.t(instance.component.footer) }}</mat-hint>
        </div>
      </div>
    </ng-template>
  `
})
export class MaterialSignatureComponent extends MaterialComponent implements AfterViewInit {
  @ViewChild('signature') signatureElement: ElementRef;

  renderComponents() {
    if (this.signatureElement) {
      this.instance.attach(this.signatureElement.nativeElement);
    }
  }

  ngAfterViewInit() {
    this.renderComponents();
  }
}
SignatureComponent.MaterialComponent = MaterialSignatureComponent;
export { SignatureComponent };
