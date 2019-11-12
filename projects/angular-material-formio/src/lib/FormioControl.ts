import { FormControl, ValidationErrors } from '@angular/forms';

// @dynamic
export class FormioControl extends FormControl {
  public instance: any;

  static customValidator(control: FormioControl): Promise<ValidationErrors> {
    return new Promise((resolve) => {
      if (control.instance) {
        control.instance.validateResolve = resolve;
      } else {
        resolve(null);
      }
    });
  }

  constructor(...args) {
    super(args[0], [], [FormioControl.customValidator.bind(FormioControl)]);
  }

  setInstance(instance: any) {
    this.instance = instance;
    const setCustomValidity = instance.setCustomValidity;
    instance.setCustomValidity = (message, dirty, external, isWarning = false) => {
      setCustomValidity.call(instance, message, dirty, external, isWarning);
      if (instance.validateResolve) {
        instance.validateResolve(message ? {custom: true} : null);
      }
    };
  }
}
