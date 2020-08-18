'use strict';

/** constants */
const phoneTemplate = '+375 (**) ***-**-**';

/** inputValueFormat */
const inputValueFormat = {
  phone: (value) => {
    return phoneTemplate
  }
};

/** export */
export default inputValueFormat;