/**
 * Property routes
 */

const express = require('express');
const router = express.Router();

// Import dependencies
const propertyModel = require('../models/Property');
const {
  validateCreateProperty,
  validateUpdateProperty,
  validateQueryParams,
  validateIdParam
} = require('../validation/propertyValidation');
const {
  handleValidationError,
  handleNotFoundError,
  handleServerError,
  asyncHandler
} = require('../middleware/errorHandler');

/**
 * @route   POST /api/properties
 * @desc    Create a new property
 * @access  Public
 */
router.post('/', asyncHandler(async (req, res) => {
  // Validate request body
  const { error, value } = validateCreateProperty(req.body);
  if (error) {
    return handleValidationError(error, res);
  }

  try {
    // Create new property
    const newProperty = propertyModel.create(value);
    res.status(201).json(newProperty);
  } catch (error) {
    return handleServerError(res, error, 'Failed to create property');
  }
}));

/**
 * @route   GET /api/properties
 * @desc    Get all properties with optional filtering and pagination
 * @access  Public
 */
router.get('/', asyncHandler(async (req, res) => {
  // Validate query parameters
  const { error, value } = validateQueryParams(req.query);
  if (error) {
    return handleValidationError(error, res);
  }

  try {
    const filters = {
      status: value.status,
      limit: value.limit,
      offset: value.offset
    };

    const result = propertyModel.getAll(filters);
    res.json(result);
  } catch (error) {
    return handleServerError(res, error, 'Failed to retrieve properties');
  }
}));

/**
 * @route   GET /api/properties/:id
 * @desc    Get a property by ID
 * @access  Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
  // Validate ID parameter
  const { error } = validateIdParam(req.params.id);
  if (error) {
    return handleValidationError(error, res);
  }

  try {
    const property = propertyModel.getById(req.params.id);
    
    if (!property) {
      return handleNotFoundError(res, `Property with ID ${req.params.id} does not exist`);
    }

    res.json(property);
  } catch (error) {
    return handleServerError(res, error, 'Failed to retrieve property');
  }
}));

/**
 * @route   PUT /api/properties/:id
 * @desc    Update a property
 * @access  Public
 */
router.put('/:id', asyncHandler(async (req, res) => {
  // Validate ID parameter
  const idValidation = validateIdParam(req.params.id);
  if (idValidation.error) {
    return handleValidationError(idValidation.error, res);
  }

  // Validate request body
  const { error, value } = validateUpdateProperty(req.body);
  if (error) {
    return handleValidationError(error, res);
  }

  try {
    // Check if property exists
    const existingProperty = propertyModel.getById(req.params.id);
    if (!existingProperty) {
      return handleNotFoundError(res, `Property with ID ${req.params.id} does not exist`);
    }

    // Update property
    const updatedProperty = propertyModel.update(req.params.id, value);
    res.json(updatedProperty);
  } catch (error) {
    return handleServerError(res, error, 'Failed to update property');
  }
}));

/**
 * @route   DELETE /api/properties/:id
 * @desc    Delete a property
 * @access  Public
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  // Validate ID parameter
  const { error } = validateIdParam(req.params.id);
  if (error) {
    return handleValidationError(error, res);
  }

  try {
    const deletedProperty = propertyModel.delete(req.params.id);
    
    if (!deletedProperty) {
      return handleNotFoundError(res, `Property with ID ${req.params.id} does not exist`);
    }

    res.json({
      message: 'Property deleted successfully',
      deletedProperty: deletedProperty
    });
  } catch (error) {
    return handleServerError(res, error, 'Failed to delete property');
  }
}));

module.exports = router;