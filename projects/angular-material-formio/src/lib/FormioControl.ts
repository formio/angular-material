import { FormControl, ValidationErrors } from '@angular/forms';
import unescape from 'lodash/unescape';

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
    instance.setCustomValidity = (message: any, dirty, external, isWarning = false) => {
      let decodedMessage = message;
      if (Array.isArray(message)) {
        decodedMessage = message.map(msg => Object.assign(msg, { message: unescape(msg.message) }));
      }
      else if (message) {
        decodedMessage = unescape(message);
      }

      setCustomValidity.call(instance, decodedMessage, dirty, external, isWarning);
      if (instance.validateResolve) {
        instance.validateResolve(decodedMessage ? {custom: true} : null);
      }
    };
  }
}
