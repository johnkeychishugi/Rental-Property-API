/**
 * Main src directory exports
 */

const createApp = require('./app');
const propertyModel = require('./models/Property');
const propertyRoutes = require('./routes/propertyRoutes');
const errorHandler = require('./middleware/errorHandler');
const propertyValidation = require('./validation/propertyValidation');
const helpers = require('./utils/helpers');

module.exports = {
  createApp,
  propertyModel,
  propertyRoutes,
  errorHandler,
  propertyValidation,
  helpers
};