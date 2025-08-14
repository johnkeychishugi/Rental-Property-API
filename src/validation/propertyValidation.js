/**
 * Property validation schemas using Joi
 */

const Joi = require('joi');

// Schema for creating a new property
const createPropertySchema = Joi.object({
  title: Joi.string().required().min(1).max(255).messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 1 character long',
    'string.max': 'Title must be no more than 255 characters long',
    'any.required': 'Title is required'
  }),
  description: Joi.string().allow('').max(1000).messages({
    'string.max': 'Description must be no more than 1000 characters long'
  }),
  address: Joi.string().required().min(1).max(500).messages({
    'string.empty': 'Address is required',
    'string.min': 'Address must be at least 1 character long',
    'string.max': 'Address must be no more than 500 characters long',
    'any.required': 'Address is required'
  }),
  price: Joi.number().positive().required().messages({
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required',
    'number.base': 'Price must be a valid number'
  }),
  status: Joi.string().valid('available', 'rented', 'maintenance').default('available').messages({
    'any.only': 'Status must be one of: available, rented, maintenance'
  })
});

// Schema for updating an existing property
const updatePropertySchema = Joi.object({
  title: Joi.string().min(1).max(255).messages({
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title must be at least 1 character long',
    'string.max': 'Title must be no more than 255 characters long'
  }),
  description: Joi.string().allow('').max(1000).messages({
    'string.max': 'Description must be no more than 1000 characters long'
  }),
  address: Joi.string().min(1).max(500).messages({
    'string.empty': 'Address cannot be empty',
    'string.min': 'Address must be at least 1 character long',
    'string.max': 'Address must be no more than 500 characters long'
  }),
  price: Joi.number().positive().messages({
    'number.positive': 'Price must be a positive number',
    'number.base': 'Price must be a valid number'
  }),
  status: Joi.string().valid('available', 'rented', 'maintenance').messages({
    'any.only': 'Status must be one of: available, rented, maintenance'
  })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Schema for query parameters
const queryParamsSchema = Joi.object({
  status: Joi.string().valid('available', 'rented', 'maintenance').messages({
    'any.only': 'Status filter must be one of: available, rented, maintenance'
  }),
  limit: Joi.number().integer().min(1).max(100).messages({
    'number.integer': 'Limit must be an integer',
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit must be no more than 100'
  }),
  offset: Joi.number().integer().min(0).messages({
    'number.integer': 'Offset must be an integer',
    'number.min': 'Offset must be 0 or greater'
  })
});

// Schema for property ID parameter
const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.integer': 'Property ID must be an integer',
    'number.positive': 'Property ID must be a positive number',
    'any.required': 'Property ID is required'
  })
});

/**
 * Validate property data for creation
 */
function validateCreateProperty(data) {
  return createPropertySchema.validate(data, { abortEarly: false });
}

/**
 * Validate property data for update
 */
function validateUpdateProperty(data) {
  return updatePropertySchema.validate(data, { abortEarly: false });
}

/**
 * Validate query parameters
 */
function validateQueryParams(params) {
  return queryParamsSchema.validate(params, { abortEarly: false });
}

/**
 * Validate property ID parameter
 */
function validateIdParam(id) {
  return idParamSchema.validate({ id: parseInt(id) }, { abortEarly: false });
}

module.exports = {
  createPropertySchema,
  updatePropertySchema,
  queryParamsSchema,
  idParamSchema,
  validateCreateProperty,
  validateUpdateProperty,
  validateQueryParams,
  validateIdParam
};