import FormioComponent from 'formiojs/components/_classes/component/Component.js';
const setValue = FormioComponent.prototype.setValue;
FormioComponent.prototype.setValue = function(...args) {
  if (this.materialComponent) {
    this.materialComponent.setValue(args[0]);
  }
  return setValue.call(this, ...args);
};

const beforeSubmit = FormioComponent.prototype.beforeSubmit;
FormioComponent.prototype.beforeSubmit = function(...args) {
  if (this.materialComponent) {
    this.materialComponent.beforeSubmit();
  }
  return beforeSubmit.call(this, ...args);
};

export default FormioComponent;
