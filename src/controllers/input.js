'use strict';

/** Input */
class Input {
  constructor(input) {
    this._input = input;
    this._inputType = this._input.dataset.inputType;
    this._inputClasseList = this._input.classList;
    this._inputField = this._input.querySelector('.input-field');
    this._inputError = this._input.querySelector('.input-error');
    this._inputHandlerBind = this._inputHandler.bind(this);
  }

  /** static methods */
  static create(input) {
    return new Input(input);
  }

  /** public methods */
  setEvents() {
    this._input.addEventListener('click', this._clickHandler.bind(this));
    this._inputField.addEventListener('blur', this._blurHandler.bind(this));
  }
  getValue() {
    return this._inputField.value;
  }
  setError(error) {
    this._setError(error);
    this._setClassname('is-error');
    this._inputField.addEventListener('input', this._inputHandlerBind);
  }

  /** private methods */
  _clickHandler() {
    if (!this._hasValue()) this._setClassname('is-filled');
    this._addFocus();
  }
  _inputHandler() {
    this._setError('');
    this._removeClassname('is-error');
    this._inputField.removeEventListener('input', this._inputHandlerBind);
  }
  _blurHandler() {
    if (this._hasValue()) return;
    this._removeClassname('is-filled');
  }

  _hasValue() {
    return !!this.getValue();
  }
  _addFocus() {
    this._inputField.focus();
  }
  _setClassname(classname) {
    this._inputClasseList.add(classname);
  }
  _removeClassname(classname) {
    this._inputClasseList.remove(classname);
  }
  _setError(error) {
    this._inputError.innerHTML = error;
  }
}

/** export */
export default Input