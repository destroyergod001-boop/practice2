# API Layer Documentation

This directory contains the centralized API layer for the application, providing a consistent interface for all model operations.

## Architecture Overview

### Core Components

1. **`apiClient.ts`** - Base Axios client with common configuration
2. **`tableApi.ts`** - Generic TableApi class for CRUD operations
3. **`modelApis.ts`** - Central registry of all model API instances
4. **`genericModelHelper.ts`** - Base helper class for common operations
5. **`jsonFieldHandler.ts`** - Handles JSON field parsing/stringification
6. **`typedJsonMapper.ts`** - Type-safe JSON field mapping utilities

### Usage Patterns

#### 1. Simple Model Operations (No Custom Logic)

For models that only need basic CRUD operations:

```typescript
import { itemsApi } from '@core/api/modelApis';

// Direct API usage
const items = await itemsApi.getAll();
const item = await itemsApi.getById(1);
const newItem = await itemsApi.create(itemData);
```

#### 2. Models with Custom Logic

For models that need preprocessing, validation, or default values:

```typescript
// Create a helper class (like AbilityApiHelper)
import { GenericModelHelper } from '@core/api/genericModelHelper';
import { itemsApi } from '@core/api/modelApis';

class ItemApiHelper extends GenericModelHelper<ItemDTOFromApi, ItemModel> {
  constructor() {
    super(itemsApi);
  }

  protected preprocessForCreate(data: Partial<ItemModel>): Partial<ItemModel> {
    // Add default values, validation, etc.
    return { ...DEFAULT_ITEM_VALUES, ...data };
  }

  protected postprocessFromApi(data: ItemModel): ItemModel {
    // Process data received from API
    return { ...DEFAULT_ITEM_VALUES, ...data };
  }
}

export const itemApiHelper = new ItemApiHelper();
```

#### 3. Using in Components

```typescript
import { statsApi, elementsApi } from '@core/api/modelApis';
import { AbilityApiHelper } from '@core/api/abilityApi';

// Simple API usage
const stats = await statsApi.getAll();

// Helper with custom logic
const abilities = await AbilityApiHelper.getAllAbilities();
```

## Adding New Models

To add a new model to the API system:

1. **Create the model interfaces** in `src/Core/Model/YourModel.ts`
2. **Add JSON field mapping** in `jsonFieldHandler.ts` if needed
3. **Register the API** in `modelApis.ts`:
   ```typescript
   export const yourModelsApi = new TableApi<YourModelDTOFromApi, YourModel>({
     basePath: '/api/your-models',
     tableName: 'your_models'
   });
   ```
4. **Create a helper class** (optional) if you need custom logic:
   ```typescript
   // src/Core/api/yourModelApi.ts
   export class YourModelApiHelper extends GenericModelHelper<YourModelDTOFromApi, YourModel> {
     constructor() {
       super(yourModelsApi);
     }
     // Add custom methods as needed
   }
   ```

## Benefits

- **Centralized Configuration**: All APIs configured in one place
- **Consistent Interface**: Same methods across all models
- **Automatic JSON Handling**: JSON fields parsed/stringified automatically
- **Type Safety**: Full TypeScript support
- **Extensible**: Easy to add custom logic when needed
- **Maintainable**: Reduces boilerplate and duplication

## JSON Field Handling

The system automatically handles JSON fields based on the configuration in `jsonFieldHandler.ts`. When you create a TableApi instance with a `tableName`, it will:

1. **Parse JSON strings to objects** when receiving data from the API
2. **Stringify objects to JSON** when sending data to the API
3. **Handle nested objects and arrays** automatically

No manual JSON parsing/stringifying needed in your components!