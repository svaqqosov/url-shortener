const expressValidation = require('express-validation');
const formatValidation = require('./functions/formatValidation');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError || err.message === 'validation error') {
    /**
     * Handle express validation errors
     */
    res.status(400).json({
      msgCode: 'VALIDATION_ERROR',
      errors: formatValidation.formatValidationErrors(err.errors)
    });
  } else if (err.name === 'ValidationError') {
    /**
     * Handle Express validation js
     */
    res.status(400).json({
      msgCode: 'VALIDATION_ERROR',
      errors: formatValidation.formatExpressValidatonErrors(err.errors)
    });
  }
};

