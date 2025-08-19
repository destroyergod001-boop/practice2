// src/Core/api/index.ts
/**
 * Central export file for all API-related functionality
 */

// Core API infrastructure
export { apiClient } from './apiClient';
export { TableApi } from './tableApi';

// Centralized model APIs
export * from './modelApis';

// Generic helpers
export { GenericModelHelper, SimpleModelHelper } from './genericModelHelper';

// Model-specific helpers (for models that need custom logic)
export { AbilityApiHelper } from './abilityApi';

// Utility functions
export * from './jsonFieldHandler';
export * from './typedJsonMapper';