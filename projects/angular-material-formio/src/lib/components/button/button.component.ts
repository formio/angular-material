import { Component } from '@angular/core';
import ButtonComponent from 'formiojs/components/button/Button.js';
import { MaterialComponent } from '../MaterialComponent';
import { AngularButtonsThemes, ButtonsThemes } from '../../const/ButtonsThemes';

@Component({
  selector: 'mat-formio-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class MaterialButtonComponent extends MaterialComponent {
  public loading = false;
  public done = false;
  public error = false;
  public disabled = false;
  public clicked = false;

  get color() {
    if (this.error) {
      return AngularButtonsThemes.WARN;
    }
    const theme = this.angularButtonTheme;
    return theme || AngularButtonsThemes.PRIMARY;
  }

  get angularButtonTheme() {
    switch (this.instance.component.theme) {
      case ButtonsThemes.PRIMARY:
        return AngularButtonsThemes.PRIMARY;

      case ButtonsThemes.INFO:
        return AngularButtonsThemes.ACCENT;

      case ButtonsThemes.DANGER:
        return AngularButtonsThemes.WARN;

      case ButtonsThemes.SECONDARY:
        return AngularButtonsThemes.BASIC;

      default:
        return '';
    }
  }

  get themeClass() {
    const theme = this.angularButtonTheme;
    if (!theme) {
      return `material-formio-theme-${this.instance.component.theme}`;
    }
    return '';
  }

  onClick(event) {
    this.clicked = true;
    this.instance.onClick(event);
  }

  getValue() {
    return this.clicked;
  }

  setState(loading, error, done) {
    this.loading = loading;
    this.done = done;
    this.error = error;
  }

  setInstance(instance) {
    const retVal = super.setInstance(instance);
    this.disabled = instance.shouldDisabled;
    instance.on('submitButton', () => this.setState(true, false, false));
    instance.on('submitDone', () => this.setState(false, false, true));
    instance.on('submitError', () => this.setState(false, true, false));
    instance.on('requestButton', () => this.setState(true, false, false));
    instance.on('requestDone', () => this.setState(false, false, true));
    instance.on('change', (event) => {
      this.disabled = this.instance.shouldDisabled || (this.instance.component.disableOnInvalid && !event.isValid);
      if (event.isValid) {
        this.loading = false;
        this.error = false;
      }
    });
    return retVal;
  }
}
ButtonComponent.MaterialComponent = MaterialButtonComponent;
export { ButtonComponent };
