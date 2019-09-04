const Joi = require('@hapi/joi');

module.exports = {
  create: {
    query: {
      url: Joi.string().uri().required()
    }
  },

  getAndDelete: {
    params: {
      id: Joi.string().regex(/^[0-9a-zA-Z-]{36}$/).required()
    }
  },

  // PUT /api/tasks/:taskId
  update: {
    params: {
      id: Joi.string().regex(/^[0-9a-zA-Z-]{36}$/).required()
    },
    body: Joi.object().keys({
      name: Joi.string().regex(/^(?=.*[a-zA-Z])[A-Za-z0-9._ -]*$/).max(255).min(3),
      role: Joi.string().min(1).max(50).required(),
      createdAt: Joi.date(),
      updatedAt: Joi.date()
    })
  }
};
