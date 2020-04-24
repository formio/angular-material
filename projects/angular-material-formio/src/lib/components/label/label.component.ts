import { Component, Input, ViewChild } from '@angular/core';
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'span[matFormioLabel]',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent {
  @Input() instance;
}
