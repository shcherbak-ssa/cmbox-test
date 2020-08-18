'use strict';

/** FormError */
class FormError extends Error {
  constructor(message, input) {
    super(message);
    this.name = 'FormError';
    this.input = input;
  }
}

/** export */
export default FormError;