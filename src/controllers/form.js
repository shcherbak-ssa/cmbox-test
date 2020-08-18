'use strict';

/** imports */
import $ from '../tools/get-by-id';
import Input from './input';

/** constants */
const form = $('form');
const inputs = form.querySelectorAll('.input');
const button = form.querySelector('.button');

/** init */
inputs.forEach(inputInit)
button.addEventListener('click', buttonClickHanlder);

function inputInit(inputElement) {
  const input = Input.create(inputElement);
  input.setEvents();
}
function buttonClickHanlder() {
  console.log('click')
}