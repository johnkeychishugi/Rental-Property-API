/**
 * Utility helper functions
 */

/**
 * Get current timestamp in ISO format
 */
function getCurrentTimestamp() {
  return new Date().toISOString();
}


module.exports = {
  getCurrentTimestamp
}