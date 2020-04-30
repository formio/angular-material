import Components from 'formiojs/components/Components';
import './components/Webform';
import { getComponents } from './components';
import Formio from 'formiojs/Formio';
import Form from 'formiojs/Form';
import Utils from 'formiojs/utils';

function initRenderer() {
    Components.setComponents(getComponents());
    Formio.Components = Components;
    Formio.Templates = {};
}

export { Form, Utils, Components, Formio, initRenderer };
