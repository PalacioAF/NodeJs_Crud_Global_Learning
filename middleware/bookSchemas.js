const Joi = require('joi');

const schemas = { 
    bodySchema:Joi.object({
        title:Joi.string().required(),
        author:Joi.string().min(3).max(30).required(),
        genre:Joi.string().required(),
        read:Joi.boolean().required()
    }),
    querySchema:Joi.object({
        title:Joi.string(),
        author:Joi.string().min(3).max(30)
    }),
    paramsSchema:Joi.object({
        id:Joi.string().min(2).required()
    })
  }; 
  module.exports = schemas;