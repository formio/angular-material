import FormioComponent from 'formiojs/components/_classes/component/Component';
const setValue = FormioComponent.prototype.setValue;
FormioComponent.prototype.setValue = function(...args) {
  if (this.materialComponent) {
    this.materialComponent.control.setValue(args[0]);
  }
  return setValue.call(this, ...args);
};

const beforeSubmit = FormioComponent.prototype.beforeSubmit;
FormioComponent.prototype.beforeSubmit = function(...args) {
  if (this.materialComponent) {
    this.materialComponent.control.markAsTouched();
  }
  return beforeSubmit.call(this, ...args);
};

export default FormioComponent;
