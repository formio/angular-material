import FormioComponent from 'formiojs/components/_classes/component/Component.js';

export default (() => {
  const beforeSubmit = FormioComponent.prototype.beforeSubmit;
  FormioComponent.prototype.beforeSubmit = function(...args) {
    if (this.materialComponent) {
      this.materialComponent.beforeSubmit();
    }
    return beforeSubmit.call(this, ...args);
  };

  Object.defineProperty(FormioComponent.prototype, 'disabled', {
    set(disabled) {
      this._disabled = disabled;
      if (this.materialComponent) {
        this.materialComponent.setDisabled(disabled);
      }
    }
  });

  Object.defineProperty(FormioComponent.prototype, 'visible', {
    set(visible) {
      if (this._visible !== visible) {
        this._visible = visible;
        this.clearOnHide();
        this.redraw();
      }
      if (this.materialComponent) {
        this.materialComponent.setVisible(visible);
      }
    }
  });
  return FormioComponent;
})();

