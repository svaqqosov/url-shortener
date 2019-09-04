/**
 * Format the errors message of Express validation errors
 *
 * @param {Array} errors list of validation errors
 */
function formatValidationErrors(errors) {
  const formattedErrors = errors.map((item) => {
    const temp = item;

    // remove unused fields
    delete temp.location;
    // types would be usefull for validation
    // https://github.com/hapijs/joi/blob/master/lib/language.js
    // delete temp.types;

    // rewrite some confusing error message
    temp.messages = temp.messages.map((message) => {
      let localMessage = message;

      // rewite "\"userId\" with value \"qbbbbc473-abd4-4b1e-98f2-fe0527823b12\" should be uuid v4 format"
      localMessage = localMessage.replace(
        'fails to match the required pattern: /^[0-9a-fA-F-]{36}$/',
        'should be uuid v4 format {{pattern}}'
      );

      return localMessage;
    });

    return temp;
  });

  // console.log(formattedMessages);
  return formattedErrors;
}

/**
 * Format the errors message of Express validation errors
 *
 * @param {Array} errors list of validation errors
 */
function formatExpressValidatonErrors(errors) {
  // console.log(errors);


  try {
    const formattedErrors = [];

    // eslint-disable-next-line
    for (const error in errors) {
      const temp = {};

      temp.field = [errors[error].path];
      temp.types = [errors[error].kind];
      switch (errors[error].kind) {
        case 'unique':
          temp.messages = [`"${errors[error].path}" is expected to be unique`];
          break;
        default:
          temp.messages = ['An error happen during validation'];
      }
      formattedErrors.push(temp);
    }

    return formattedErrors;
  } catch (err) {
    return 'An error happen during formating of validation message';
  }
}

module.exports = {
  formatValidationErrors,
  formatExpressValidatonErrors
};
