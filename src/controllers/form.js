'use strict';

/** imports */
import $ from '../tools/get-by-id';
import Input from './input';
import Popup from './popup';

/** constants */
const formContainer = $('form-container');
const inputs = formContainer.querySelectorAll('.input');
const button = formContainer.querySelector('.button');

/** init */
inputs.forEach(inputInit)
button.addEventListener('click', buttonClickHanlder);

function inputInit(inputElement) {
  const input = Input.create(inputElement);
  input.setEvents();
}
function buttonClickHanlder() {
  console.log('click')
  showPopup();
}
function showPopup() {
  const popup = Popup.create();
  popup.open();
}