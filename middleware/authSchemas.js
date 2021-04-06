const Joi = require('joi');

const schemas = { 
    bodySchema:Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().alphanum().required(),
    })
  }; 
  module.exports = schemas;