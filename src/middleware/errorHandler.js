/**
 * Error handling middleware
 */

/**
 * Handle validation errors
 */
function handleValidationError(error, res) {
  return res.status(400).json({
    error: 'Validation error',
    details: error.details.map(detail => detail.message)
  });
}

/**
 * Handle not found errors
 */
function handleNotFoundError(res, message = 'Resource not found') {
  return res.status(404).json({
    error: 'Not Found',
    message: message
  });
}

/**
 * Handle server errors
 */
function handleServerError(res, error, message = 'Internal server error') {
  console.error('Server Error:', error);
  return res.status(500).json({
    error: 'Internal server error',
    message: message
  });
}

/**
 * Global error handling middleware
 */
function globalErrorHandler(err, req, res, next) {
  console.error('Global Error Handler:', err.stack);
  
  // If response was already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Handle different types of errors
  if (err.name === 'ValidationError') {
    return handleValidationError(err, res);
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID format',
      message: 'The provided ID is not valid'
    });
  }

  // Default server error
  return res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong!'
  });
}

/**
 * 404 handler for undefined routes
 */
function notFoundHandler(req, res) {
  return res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
}

/**
 * Async error wrapper to catch async errors in route handlers
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  handleValidationError,
  handleNotFoundError,
  handleServerError,
  globalErrorHandler,
  notFoundHandler,
  asyncHandler
};