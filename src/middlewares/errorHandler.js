const expressValidation = require('express-validation');
const formatMongo = require('./functions/formatMongo');
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
  } else if (err.name === 'BulkWriteError' || err.name === 'MongoError') {
    /**
     * Handle Mongo errors
     */
    switch (err.code) {
      case 11000:
      case 11001:
        res.status(400).json({
          msgCode: 'VALIDATION_ERROR',
          errors: formatMongo.formatMongoDupAsValidationError(err)
        });
        break;

      default:
        break;
    }
  }
};

