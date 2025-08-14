# Rental Property API

A RESTful API for managing rental properties built with Node.js and Express.js using a modular architecture.

## Features

- ✅ Create, read, update, and delete properties
- ✅ Input validation with Joi
- ✅ Error handling with appropriate HTTP status codes
- ✅ In-memory data storage
- ✅ Filtering by property status
- ✅ Pagination support
- ✅ CORS enabled
- ✅ Health check endpoint
- ✅ **Modular architecture** with separated concerns
- ✅ **Clean code structure** with organized directories

## Project Structure

```
rental/
├── src/
│   ├── models/           # Data models and business logic
│   │   └── Property.js   # Property model with CRUD operations
│   ├── routes/           # API route handlers
│   │   └── propertyRoutes.js # Property-related routes
│   ├── validation/       # Input validation schemas
│   │   └── propertyValidation.js # Joi validation schemas
│   ├── middleware/       # Express middleware
│   │   └── errorHandler.js # Error handling middleware
│   ├── utils/           # Utility functions
│   │   └── helpers.js   # Helper functions
│   ├── app.js           # Express app configuration
│   └── index.js         # Main exports
├── server.js            # Server entry point
├── package.json         # Dependencies and scripts
└── README.md           # Documentation
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will start on port 3000 by default.

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 1. Create Property
**POST** `/api/properties`

**Request Body:**
```json
{
  "title": "Luxury Apartment",
  "description": "A beautiful apartment in downtown.",
  "address": "123 Main St",
  "price": 250000,
  "status": "available"
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "Luxury Apartment",
  "description": "A beautiful apartment in downtown.",
  "address": "123 Main St",
  "price": 250000,
  "status": "available",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 2. Get All Properties
**GET** `/api/properties`

**Query Parameters:**
- `status` (optional): Filter by status (`available`, `rented`, `maintenance`)
- `limit` (optional): Number of properties to return
- `offset` (optional): Number of properties to skip

**Response (200):**
```json
{
  "properties": [...],
  "total": 10,
  "filtered": 5
}
```

### 3. Get Property by ID
**GET** `/api/properties/:id`

**Response (200):**
```json
{
  "id": 1,
  "title": "Luxury Apartment",
  "description": "A beautiful apartment in downtown.",
  "address": "123 Main St",
  "price": 250000,
  "status": "available",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Response (404):**
```json
{
  "error": "Property not found",
  "message": "Property with ID 999 does not exist"
}
```

### 4. Update Property
**PUT** `/api/properties/:id`

**Request Body (partial update allowed):**
```json
{
  "price": 275000,
  "status": "rented"
}
```

**Response (200):**
```json
{
  "id": 1,
  "title": "Luxury Apartment",
  "description": "A beautiful apartment in downtown.",
  "address": "123 Main St",
  "price": 275000,
  "status": "rented",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:35:00.000Z"
}
```

### 5. Delete Property
**DELETE** `/api/properties/:id`

**Response (200):**
```json
{
  "message": "Property deleted successfully",
  "deletedProperty": {
    "id": 1,
    "title": "Luxury Apartment",
    ...
  }
}
```

## Validation Rules

### Property Creation/Update
- `title`: Required string (1-255 characters)
- `description`: Optional string (max 1000 characters)
- `address`: Required string (1-500 characters)
- `price`: Required positive number
- `status`: Optional enum (`available`, `rented`, `maintenance`), defaults to `available`

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "details": ["Additional validation errors..."]
}
```

## Health Check

**GET** `/health`

Returns server status and uptime information.

## Testing the API

### Using curl

1. Create a property:
```bash
curl -X POST http://localhost:3000/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Modern Condo",
    "description": "Beautiful condo with city view",
    "address": "456 Oak Ave",
    "price": 180000
  }'
```

2. Get all properties:
```bash
curl http://localhost:3000/api/properties
```

3. Get property by ID:
```bash
curl http://localhost:3000/api/properties/1
```

4. Update property:
```bash
curl -X PUT http://localhost:3000/api/properties/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 190000}'
```

5. Delete property:
```bash
curl -X DELETE http://localhost:3000/api/properties/1
```

### Using Postman

Import the following collection or create requests manually:

1. **Create Property**: POST to `http://localhost:3000/api/properties`
2. **Get All Properties**: GET to `http://localhost:3000/api/properties`
3. **Get Property by ID**: GET to `http://localhost:3000/api/properties/1`
4. **Update Property**: PUT to `http://localhost:3000/api/properties/1`
5. **Delete Property**: DELETE to `http://localhost:3000/api/properties/1`

## Bonus Features Implemented

- ✅ **Status Filtering**: Filter properties by status using `?status=available`
- ✅ **Pagination**: Use `?limit=10&offset=0` for pagination
- ✅ **Comprehensive Error Handling**: Proper HTTP status codes and error messages
- ✅ **Input Validation**: Using Joi for robust validation
- ✅ **CORS Support**: API can be called from web browsers