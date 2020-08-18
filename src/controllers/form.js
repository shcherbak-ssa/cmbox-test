'use strict';

/** imports */
import $ from '../tools/get-by-id';
import Input from './input';
import Popup from './popup';
import FormError from './form-error';

/** constants */
const ERROR_MESSAGE = 'The field must be filled';

const formContainer = $('form-container');
const inputs = [].map.call(formContainer.querySelectorAll('.input'), Input.create);
const button = formContainer.querySelector('.button');

/** init */
inputs.forEach(inputInit)
button.addEventListener('click', buttonClickHanlder);

/** functions */
function inputInit(input) {
  input.setEvents();
}
function buttonClickHanlder() {
  try {
    validateInputs();
    showPopup();
  } catch (error) {
    if (error.name !== 'FormError') return console.log(error.message);
    error.input.setError(error.message);
  }
}
function validateInputs() {
  inputs.forEach((input) => {
    const value = input.getValue();
    if (!value) throw new FormError(ERROR_MESSAGE, input)
  })
}
function showPopup() {
  const popup = Popup.create();
  popup.open();
}