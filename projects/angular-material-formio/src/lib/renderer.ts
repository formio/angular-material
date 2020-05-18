const Components = require('formiojs/components/Components').default;
import './components/Webform';
import { getComponents, registerComponent } from './components';
const Formio = require('formiojs/Formio').default;
const Form = require('formiojs/Form').default;
const Utils = require('formiojs/utils').default;

function initRenderer() {
    Components.setComponents(getComponents());
    Formio.Components = Components;
    Formio.Templates = {};
}

export { Form, Utils, Components, Formio, initRenderer, registerComponent };
