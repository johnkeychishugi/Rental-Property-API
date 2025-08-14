// Import the application factory
const createApp = require('./src/app');

// Configuration
const PORT = process.env.PORT || 3000;

// Create the Express application
const app = createApp();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📋 API endpoints available at http://localhost:${PORT}/api/properties`);
  console.log(`❤️  Health check available at http://localhost:${PORT}/health`);
  console.log(`📁 Using modular structure from src/ directory`);
});

module.exports = app;