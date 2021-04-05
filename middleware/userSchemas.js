const Joi = require('joi');

const schemas = { 
    bodySchema:Joi.object({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        userName:Joi.string(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().alphanum().required(),
        address:Joi.string().required(),
        phone:Joi.string().alphanum().required(),
    }),
    querySchema:Joi.object({
        userName:Joi.string().alphanum().min(1).max(20)
    }),
    paramsSchema:Joi.object({
        id:Joi.string().min(2).required()
    })
  }; 
  module.exports = schemas;