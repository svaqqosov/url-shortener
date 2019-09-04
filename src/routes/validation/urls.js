const Joi = require('@hapi/joi');

module.exports = {
  create: {
    query: {
      url: Joi.string().uri().required()
    }
  },

  getAndDelete: {
    params: {
      key: Joi.string().regex(/^[0-9a-zA-Z-]{8}$/).required()
    }
  }
};
