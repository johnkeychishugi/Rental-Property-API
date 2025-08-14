/**
 * Main application setup
 */

const express = require('express');
const cors = require('cors');

// Import middleware
const {
  globalErrorHandler,
  notFoundHandler
} = require('./middleware/errorHandler');

// Import routes
const propertyRoutes = require('./routes/propertyRoutes');

// Import utilities
const { getCurrentTimestamp } = require('./utils/helpers');

/**
 * Create Express application
 */
function createApp() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // Request logging middleware (simple)
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      timestamp: getCurrentTimestamp(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // API routes
  app.use('/api/properties', propertyRoutes);

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Rental Property API',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        properties: '/api/properties',
        docs: 'See README.md for API documentation'
      }
    });
  });

  // 404 handler for undefined routes
  app.use('*', notFoundHandler);

  // Global error handling middleware
  app.use(globalErrorHandler);

  return app;
}

module.exports = createApp;