/**
 * Property model and data management
 */

class PropertyModel {
  constructor() {
    this.properties = [];
    this.nextId = 1;
  }

  /**
   * Get all properties with optional filtering and pagination
   */
  getAll(filters = {}) {
    let filteredProperties = [...this.properties];

    // Filter by status if provided
    if (filters.status) {
      filteredProperties = filteredProperties.filter(property => 
        property.status === filters.status
      );
    }

    // Apply pagination if provided
    if (filters.limit && filters.limit > 0) {
      const startIndex = filters.offset || 0;
      const endIndex = startIndex + filters.limit;
      filteredProperties = filteredProperties.slice(startIndex, endIndex);
    } else if (filters.offset && filters.offset > 0) {
      filteredProperties = filteredProperties.slice(filters.offset);
    }

    return {
      properties: filteredProperties,
      total: this.properties.length,
      filtered: filteredProperties.length
    };
  }

  /**
   * Get property by ID
   */
  getById(id) {
    const numericId = parseInt(id);
    return this.properties.find(property => property.id === numericId);
  }

  /**
   * Create a new property
   */
  create(propertyData) {
    const newProperty = {
      id: this.nextId++,
      ...propertyData,
      createdAt: this.getCurrentTimestamp(),
      updatedAt: this.getCurrentTimestamp()
    };

    this.properties.push(newProperty);
    return newProperty;
  }

  /**
   * Update an existing property
   */
  update(id, updateData) {
    const property = this.getById(id);
    if (!property) {
      return null;
    }

    // Update property fields
    Object.keys(updateData).forEach(key => {
      property[key] = updateData[key];
    });
    property.updatedAt = this.getCurrentTimestamp();

    return property;
  }

  /**
   * Delete a property
   */
  delete(id) {
    const propertyIndex = this.properties.findIndex(property => 
      property.id === parseInt(id)
    );
    
    if (propertyIndex === -1) {
      return null;
    }

    const deletedProperty = this.properties.splice(propertyIndex, 1)[0];
    return deletedProperty;
  }

  /**
   * Get current timestamp
   */
  getCurrentTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Get properties count
   */
  getCount() {
    return this.properties.length;
  }

  /**
   * Check if property exists
   */
  exists(id) {
    return this.getById(id) !== undefined;
  }
}

// Create and export a singleton instance
const propertyModel = new PropertyModel();

module.exports = propertyModel;