'use strict';

/** imports */
import $ from '../tools/get-by-id';

/** Popup */
class Popup {
  constructor() {
    this._popup = $('popup');
    this._popupClose = this._closeHandler.bind(this);
  }

  /** static methods */
  static create() {
    return new Popup();
  }

  /** public methods */
  open() {
    this._popup.classList.add('is-open');
    this._setBodyOverflow('hidden');
    this._setEvents();
  }

  /** private methods */
  _closeHandler() {
    this._popup.classList.remove('is-open');
    this._setBodyOverflow('');
    this._removeEvents();
  }
  
  _setEvents() {
    this._findCloseElements();
    this._closeButton.addEventListener('click', this._popupClose);
    this._button.addEventListener('click', this._popupClose);
  }
  _findCloseElements() {
    this._closeButton = this._popup.querySelector('.popup-close');
    this._button = this._popup.querySelector('.popup-button');
  }
  _removeEvents() {
    this._closeButton.removeEventListener('click', this._popupClose);
    this._button.removeEventListener('click', this._popupClose);
    this._deleteCloseElement();
  }
  _deleteCloseElement() {
    this._closeButton = null;
    this._button = null;
  }
  _setBodyOverflow(value) {
    document.body.style.overflow = value;
  }
}

/** export */
export default Popup;