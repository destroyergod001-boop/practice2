# Development Checklist: Model Management & Local Storage Fallback

## Overview
This checklist outlines the implementation of management modules for all backend models and a local storage fallback system for offline functionality.

## Phase 1: Define the New Choice Model

### Choice Model Implementation
- [ ] Create `src/Core/Model/Choice.ts` with complete interfaces
  - [ ] Define `Choice` interface with all required fields
  - [ ] Define `ChoiceModel` interface with parsed JSON fields
  - [ ] Define `ChoiceDTOFromApi` interface for API responses
  - [ ] Implement `getDefaultChoiceData()` function
- [ ] Update `src/Core/Model/index.ts` to export Choice interfaces
- [ ] Add Choice to `src/Core/api/jsonFieldHandler.ts` with JSON field mappings
- [ ] Add `choicesApi` to `src/Core/api/modelApis.ts`

### Choice Model Fields
The Choice model should include:
- `id: number` - Primary key
- `text: string` - Choice display text
- `target_node_id: number` - ID of the target story node
- `requirement_stats: string` - JSON string of required stats
- `requirement_element_mastery: string` - JSON string of required element mastery
- `requirement_element_resistance: string` - JSON string of required element resistance
- `reward_basic_stats: string` - JSON string of stat rewards
- `reward_element_mastery: string` - JSON string of element mastery rewards
- `reward_element_resistance: string` - JSON string of element resistance rewards
- `reward_item_ids: string` - JSON string of item ID rewards

## Phase 2: Model Management Modules

### Elements Management
- [ ] Create `src/Modules/Admin/ElementsManagement/ElementsManagement.tsx`
- [ ] Create `src/Modules/Admin/ElementsManagement/ElementModal.tsx`
- [ ] Create `src/Modules/Admin/ElementsManagement/ElementBasicTab.tsx`
- [ ] Create `src/Modules/Admin/ElementsManagement/ElementAssetTab.tsx`
- [ ] Create `src/Modules/Admin/ElementsManagement/components/ElementsList.tsx`
- [ ] Create `src/Modules/Admin/ElementsManagement/controllers/ElementsListController.ts`
- [ ] Create `src/Modules/Admin/ElementsManagement/controllers/ElementsModalController.ts`
- [ ] Create `src/Modules/Admin/ElementsManagement/controllers/ElementsInputController.ts`

### Items Management (Fix existing implementation)
- [ ] Review and fix `src/Modules/Admin/ItemsManagement/ItemsManagement.tsx`
- [ ] Review and fix `src/Modules/Admin/ItemsManagement/ItemModal.tsx`
- [ ] Review and fix `src/Modules/Admin/ItemsManagement/ItemBasicTab.tsx`
- [ ] Review and fix `src/Modules/Admin/ItemsManagement/ItemAssetTab.tsx`
- [ ] Review and fix `src/Modules/Admin/ItemsManagement/components/ItemsList.tsx`
- [ ] Review and fix `src/Modules/Admin/ItemsManagement/controllers/ItemsListController.ts`
- [ ] Review and fix `src/Modules/Admin/ItemsManagement/controllers/ItemsModalController.ts`
- [ ] Review and fix `src/Modules/Admin/ItemsManagement/controllers/ItemsInputController.ts`

### Monsters Management
- [ ] Create `src/Modules/Admin/MonstersManagement/MonstersManagement.tsx`
- [ ] Create `src/Modules/Admin/MonstersManagement/MonsterModal.tsx`
- [ ] Create `src/Modules/Admin/MonstersManagement/MonsterBasicTab.tsx`
- [ ] Create `src/Modules/Admin/MonstersManagement/MonsterAssetTab.tsx`
- [ ] Create `src/Modules/Admin/MonstersManagement/components/MonstersList.tsx`
- [ ] Create `src/Modules/Admin/MonstersManagement/controllers/MonstersListController.ts`
- [ ] Create `src/Modules/Admin/MonstersManagement/controllers/MonstersModalController.ts`
- [ ] Create `src/Modules/Admin/MonstersManagement/controllers/MonstersInputController.ts`

### Occupations Management
- [ ] Create `src/Modules/Admin/OccupationsManagement/OccupationsManagement.tsx`
- [ ] Create `src/Modules/Admin/OccupationsManagement/OccupationModal.tsx`
- [ ] Create `src/Modules/Admin/OccupationsManagement/OccupationBasicTab.tsx`
- [ ] Create `src/Modules/Admin/OccupationsManagement/OccupationAssetTab.tsx`
- [ ] Create `src/Modules/Admin/OccupationsManagement/components/OccupationsList.tsx`
- [ ] Create `src/Modules/Admin/OccupationsManagement/controllers/OccupationsListController.ts`
- [ ] Create `src/Modules/Admin/OccupationsManagement/controllers/OccupationsModalController.ts`
- [ ] Create `src/Modules/Admin/OccupationsManagement/controllers/OccupationsInputController.ts`

### Player Inventory Management
- [ ] Create `src/Modules/Admin/PlayerInventoryManagement/PlayerInventoryManagement.tsx`
- [ ] Create `src/Modules/Admin/PlayerInventoryManagement/PlayerInventoryModal.tsx`
- [ ] Create `src/Modules/Admin/PlayerInventoryManagement/PlayerInventoryBasicTab.tsx`
- [ ] Create `src/Modules/Admin/PlayerInventoryManagement/components/PlayerInventoryList.tsx`
- [ ] Create `src/Modules/Admin/PlayerInventoryManagement/controllers/PlayerInventoryListController.ts`
- [ ] Create `src/Modules/Admin/PlayerInventoryManagement/controllers/PlayerInventoryModalController.ts`
- [ ] Create `src/Modules/Admin/PlayerInventoryManagement/controllers/PlayerInventoryInputController.ts`

### Player Profile Management
- [ ] Create `src/Modules/Admin/PlayerProfileManagement/PlayerProfileManagement.tsx`
- [ ] Create `src/Modules/Admin/PlayerProfileManagement/PlayerProfileModal.tsx`
- [ ] Create `src/Modules/Admin/PlayerProfileManagement/PlayerProfileBasicTab.tsx`
- [ ] Create `src/Modules/Admin/PlayerProfileManagement/components/PlayerProfilesList.tsx`
- [ ] Create `src/Modules/Admin/PlayerProfileManagement/controllers/PlayerProfilesListController.ts`
- [ ] Create `src/Modules/Admin/PlayerProfileManagement/controllers/PlayerProfilesModalController.ts`
- [ ] Create `src/Modules/Admin/PlayerProfileManagement/controllers/PlayerProfilesInputController.ts`

### Player Equipment Profile Management
- [ ] Create `src/Modules/Admin/PlayerEquipmentProfileManagement/PlayerEquipmentProfileManagement.tsx`
- [ ] Create `src/Modules/Admin/PlayerEquipmentProfileManagement/PlayerEquipmentProfileModal.tsx`
- [ ] Create `src/Modules/Admin/PlayerEquipmentProfileManagement/PlayerEquipmentProfileBasicTab.tsx`
- [ ] Create `src/Modules/Admin/PlayerEquipmentProfileManagement/components/PlayerEquipmentProfilesList.tsx`
- [ ] Create `src/Modules/Admin/PlayerEquipmentProfileManagement/controllers/PlayerEquipmentProfilesListController.ts`
- [ ] Create `src/Modules/Admin/PlayerEquipmentProfileManagement/controllers/PlayerEquipmentProfilesModalController.ts`
- [ ] Create `src/Modules/Admin/PlayerEquipmentProfileManagement/controllers/PlayerEquipmentProfilesInputController.ts`

### Shops Management
- [ ] Create `src/Modules/Admin/ShopsManagement/ShopsManagement.tsx`
- [ ] Create `src/Modules/Admin/ShopsManagement/ShopModal.tsx`
- [ ] Create `src/Modules/Admin/ShopsManagement/ShopBasicTab.tsx`
- [ ] Create `src/Modules/Admin/ShopsManagement/ShopAssetTab.tsx`
- [ ] Create `src/Modules/Admin/ShopsManagement/components/ShopsList.tsx`
- [ ] Create `src/Modules/Admin/ShopsManagement/controllers/ShopsListController.ts`
- [ ] Create `src/Modules/Admin/ShopsManagement/controllers/ShopsModalController.ts`
- [ ] Create `src/Modules/Admin/ShopsManagement/controllers/ShopsInputController.ts`

### Stats Management
- [ ] Create `src/Modules/Admin/StatsManagement/StatsManagement.tsx`
- [ ] Create `src/Modules/Admin/StatsManagement/StatModal.tsx`
- [ ] Create `src/Modules/Admin/StatsManagement/StatBasicTab.tsx`
- [ ] Create `src/Modules/Admin/StatsManagement/components/StatsList.tsx`
- [ ] Create `src/Modules/Admin/StatsManagement/controllers/StatsListController.ts`
- [ ] Create `src/Modules/Admin/StatsManagement/controllers/StatsModalController.ts`
- [ ] Create `src/Modules/Admin/StatsManagement/controllers/StatsInputController.ts`

### Stories Management
- [ ] Create `src/Modules/Admin/StoriesManagement/StoriesManagement.tsx`
- [ ] Create `src/Modules/Admin/StoriesManagement/StoryModal.tsx`
- [ ] Create `src/Modules/Admin/StoriesManagement/StoryBasicTab.tsx`
- [ ] Create `src/Modules/Admin/StoriesManagement/StoryAssetTab.tsx`
- [ ] Create `src/Modules/Admin/StoriesManagement/components/StoriesList.tsx`
- [ ] Create `src/Modules/Admin/StoriesManagement/controllers/StoriesListController.ts`
- [ ] Create `src/Modules/Admin/StoriesManagement/controllers/StoriesModalController.ts`
- [ ] Create `src/Modules/Admin/StoriesManagement/controllers/StoriesInputController.ts`

### Villeins Management
- [ ] Create `src/Modules/Admin/VilleinsManagement/VilleinsManagement.tsx`
- [ ] Create `src/Modules/Admin/VilleinsManagement/VilleinModal.tsx`
- [ ] Create `src/Modules/Admin/VilleinsManagement/VilleinBasicTab.tsx`
- [ ] Create `src/Modules/Admin/VilleinsManagement/VilleinAssetTab.tsx`
- [ ] Create `src/Modules/Admin/VilleinsManagement/components/VilleinsList.tsx`
- [ ] Create `src/Modules/Admin/VilleinsManagement/controllers/VilleinsListController.ts`
- [ ] Create `src/Modules/Admin/VilleinsManagement/controllers/VilleinsModalController.ts`
- [ ] Create `src/Modules/Admin/VilleinsManagement/controllers/VilleinsInputController.ts`

### Choices Management (New Model)
- [ ] Create `src/Modules/Admin/ChoicesManagement/ChoicesManagement.tsx`
- [ ] Create `src/Modules/Admin/ChoicesManagement/ChoiceModal.tsx`
- [ ] Create `src/Modules/Admin/ChoicesManagement/ChoiceBasicTab.tsx`
- [ ] Create `src/Modules/Admin/ChoicesManagement/components/ChoicesList.tsx`
- [ ] Create `src/Modules/Admin/ChoicesManagement/controllers/ChoicesListController.ts`
- [ ] Create `src/Modules/Admin/ChoicesManagement/controllers/ChoicesModalController.ts`
- [ ] Create `src/Modules/Admin/ChoicesManagement/controllers/ChoicesInputController.ts`

## Phase 3: Local Storage Fallback Implementation

### Core Infrastructure
- [ ] Create `src/Core/services/OfflineManager.ts`
  - [ ] Implement offline state management
  - [ ] Create methods for detecting network connectivity
  - [ ] Implement data synchronization logic
- [ ] Create `src/Core/services/LocalStorageService.ts`
  - [ ] Implement CRUD operations for localStorage
  - [ ] Create data serialization/deserialization methods
  - [ ] Implement data validation for localStorage operations

### API Layer Updates
- [ ] Update `src/Core/api/apiClient.ts`
  - [ ] Add axios interceptor for network error detection
  - [ ] Implement automatic offline mode switching
  - [ ] Add retry logic for failed requests
- [ ] Update `src/Core/api/tableApi.ts`
  - [ ] Add offline detection checks before API calls
  - [ ] Implement localStorage fallback for all CRUD operations
  - [ ] Add data caching for successful API responses
  - [ ] Implement conflict resolution for offline/online data

### UI Updates
- [ ] Create `src/Core/ui/OfflineIndicator.tsx`
  - [ ] Display current connection status
  - [ ] Show sync status and pending changes
- [ ] Update `src/components/Layout.tsx`
  - [ ] Add offline indicator to navigation
  - [ ] Show sync notifications

## Phase 4: Admin Base Page Integration

### Sidebar Updates
- [ ] Update `src/Modules/Admin/AdminBasePage/AdminBasePage.tsx`
  - [ ] Add Elements Management to sidebar
  - [ ] Add Items Management to sidebar
  - [ ] Add Monsters Management to sidebar
  - [ ] Add Occupations Management to sidebar
  - [ ] Add Player Inventory Management to sidebar
  - [ ] Add Player Profile Management to sidebar
  - [ ] Add Player Equipment Profile Management to sidebar
  - [ ] Add Shops Management to sidebar
  - [ ] Add Stats Management to sidebar
  - [ ] Add Stories Management to sidebar
  - [ ] Add Villeins Management to sidebar
  - [ ] Add Choices Management to sidebar

### Route Handling
- [ ] Add route cases for all new management modules
- [ ] Import all new management components
- [ ] Add appropriate icons for each management module

## Phase 5: API Configuration

### Model APIs Registration
- [ ] Add `elementsApi` to `src/Core/api/modelApis.ts`
- [ ] Verify `itemsApi` configuration in `src/Core/api/modelApis.ts`
- [ ] Add `monstersApi` to `src/Core/api/modelApis.ts`
- [ ] Add `occupationsApi` to `src/Core/api/modelApis.ts`
- [ ] Add `playerInventoriesApi` to `src/Core/api/modelApis.ts`
- [ ] Add `playerProfilesApi` to `src/Core/api/modelApis.ts`
- [ ] Add `playerEquipmentProfilesApi` to `src/Core/api/modelApis.ts`
- [ ] Add `shopsApi` to `src/Core/api/modelApis.ts`
- [ ] Add `statsApi` to `src/Core/api/modelApis.ts`
- [ ] Add `storiesApi` to `src/Core/api/modelApis.ts`
- [ ] Add `villeinsApi` to `src/Core/api/modelApis.ts`
- [ ] Add `choicesApi` to `src/Core/api/modelApis.ts`

### JSON Field Mappings
- [ ] Verify `elements` entry in `src/Core/api/jsonFieldHandler.ts`
- [ ] Verify `items` entry in `src/Core/api/jsonFieldHandler.ts`
- [ ] Verify `monsters` entry in `src/Core/api/jsonFieldHandler.ts`
- [ ] Verify `occupations` entry in `src/Core/api/jsonFieldHandler.ts`
- [ ] Verify `Inventory` entry in `src/Core/api/jsonFieldHandler.ts`
- [ ] Verify `PlayerProfile` entry in `src/Core/api/jsonFieldHandler.ts`
- [ ] Verify `player_equipment_profiles` entry in `src/Core/api/jsonFieldHandler.ts`
- [ ] Verify `shops` entry in `src/Core/api/jsonFieldHandler.ts`
- [ ] Add `stats` entry in `src/Core/api/jsonFieldHandler.ts`
- [ ] Verify `Story` entry in `src/Core/api/jsonFieldHandler.ts`
- [ ] Verify `Villein` entry in `src/Core/api/jsonFieldHandler.ts`
- [ ] Add `Choice` entry in `src/Core/api/jsonFieldHandler.ts`

## Phase 6: Testing & Validation

### Component Testing
- [ ] Test each management module individually
- [ ] Verify CRUD operations work correctly
- [ ] Test form validation and error handling
- [ ] Test search, sorting, and pagination functionality

### Integration Testing
- [ ] Test navigation between management modules
- [ ] Verify data consistency across modules
- [ ] Test modal interactions and state management

### Offline Functionality Testing
- [ ] Test localStorage fallback when backend is unavailable
- [ ] Verify data persistence across browser sessions
- [ ] Test data synchronization when connectivity is restored
- [ ] Test conflict resolution for offline changes

## Phase 7: Documentation & Cleanup

### Code Documentation
- [ ] Add JSDoc comments to all new controllers
- [ ] Document API endpoints and data structures
- [ ] Create usage examples for each management module

### File Cleanup
- [ ] Remove any unused or duplicate files
- [ ] Ensure consistent naming conventions
- [ ] Verify all imports and exports are correct

### README Updates
- [ ] Update main README.md with new management modules
- [ ] Document offline functionality and limitations
- [ ] Add troubleshooting guide for common issues

## Implementation Notes

### File Structure Pattern
Each management module should follow this structure:
```
src/Modules/Admin/[Model]sManagement/
├── [Model]sManagement.tsx          # Main component
├── [Model]Modal.tsx                # Modal for create/edit
├── [Model]BasicTab.tsx             # Basic info tab
├── [Model]AssetTab.tsx             # Asset configuration tab (if applicable)
├── components/
│   └── [Model]sList.tsx            # List component with table
└── controllers/
    ├── [Model]sListController.ts   # List state management
    ├── [Model]sModalController.ts  # Modal state management
    └── [Model]sInputController.ts  # Input validation helpers
```

### Naming Conventions
- Use PascalCase for component names
- Use camelCase for function and variable names
- Use kebab-case for file names when appropriate
- Maintain consistency with existing codebase patterns

### Error Handling
- Implement proper error boundaries for each management module
- Add user-friendly error messages
- Log errors appropriately for debugging
- Provide fallback UI states for error conditions

### Performance Considerations
- Implement debounced search functionality
- Use pagination for large datasets
- Optimize re-renders with proper memoization
- Consider virtual scrolling for very large lists

### Accessibility
- Ensure proper ARIA labels and roles
- Implement keyboard navigation
- Maintain proper focus management
- Use semantic HTML elements

## Priority Order

### High Priority (Core Functionality)
1. Choice Model Implementation
2. Items Management (fix existing)
3. Monsters Management
4. Stories Management
5. Local Storage Fallback

### Medium Priority (Extended Functionality)
6. Elements Management
7. Stats Management
8. Races Management (complete implementation)
9. Occupations Management
10. Shops Management

### Low Priority (Advanced Features)
11. Player Profile Management
12. Player Inventory Management
13. Player Equipment Profile Management
14. Villeins Management
15. Choices Management

## Success Criteria

### Functional Requirements
- [ ] All models have complete CRUD management interfaces
- [ ] Local storage fallback works seamlessly when backend is unavailable
- [ ] Data validation prevents invalid entries
- [ ] Search, sort, and pagination work correctly for all lists

### Technical Requirements
- [ ] Code follows established patterns and conventions
- [ ] TypeScript types are properly defined and used
- [ ] Error handling is comprehensive and user-friendly
- [ ] Performance is optimized for large datasets

### User Experience Requirements
- [ ] UI is consistent across all management modules
- [ ] Loading states and feedback are clear
- [ ] Offline mode is transparent to users
- [ ] Data synchronization is reliable and conflict-free

## Notes

- Each management module should be self-contained and follow the same patterns
- The local storage fallback should be transparent to the user
- Data synchronization conflicts should be handled gracefully
- All components should be responsive and accessible
- Error states should provide clear guidance for resolution