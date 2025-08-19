# Mystic Realms - React 19 Gaming Template

A comprehensive React 19 + TypeScript gaming application template featuring advanced game mechanics, inventory management, and administrative tools.

## 🚀 Features

### Core Functionality
- **React 19** with latest features and optimizations
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** with custom CSS variables and dark mode support
- **Controller Pattern** architecture for clean separation of concerns
- **Vite** for fast development and building

### Game Features
- **Dual Portal System**: Separate player and admin access points
- **Real-time Game Ticks**: Simulated game time with live updates
- **Advanced Inventory System**:
  - HTML5 drag-and-drop functionality
  - Item stacking and sorting
  - Equipment system with visual slots
  - Debounced search with real-time filtering
- **Player Management**: Character stats, levels, and progression
- **Quest System**: Active quest tracking and completion
- **Achievement System**: Unlockable achievements with progress tracking

### Administrative Features
- **Full CRUD Operations**: Complete item management system
- **Optimistic Updates**: Instant UI feedback with rollback on failure
- **Modal Forms**: Tabbed interface for complex item creation/editing
- **API Integration**: Robust API helper with retry logic and offline detection
- **User Management**: Administrative oversight tools

### Technical Features
- **Dark Mode**: Persistent theme switching with localStorage
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Animation System**: Smooth transitions and micro-interactions
- **Modular Architecture**: Each component has dedicated controller modules
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🏗️ Architecture

### File Structure
```
src/
├── components/ui/          # Reusable UI components with controllers
├── controllers/            # Business logic controllers
├── hooks/                  # Custom React hooks
├── models/                 # TypeScript interfaces and types
├── pages/                  # Application pages (≤100 lines each)
├── services/               # API services and utilities
└── utils/                  # Utility functions and seed data
```

### Controller Pattern
Each UI component follows the controller pattern:
- `Component.tsx` - React component (presentation)
- `ComponentController.ts` - Business logic and state management

## 🎮 Usage

### Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Access the application at `http://localhost:5173`

### Login Credentials
- **Password**: `123` (for both player and admin)
- **Admin Access**: Include "admin" in username for admin privileges

### Key Pages
- **Landing**: Animated portal selection with theme toggle
- **Player Dashboard**: Character overview, stats, and quest management
- **Admin Dashboard**: System management and item CRUD operations
- **Inventory**: Drag-and-drop inventory with equipment system

## 🔧 Configuration

### Theme System
The application supports light/dark themes with CSS variables:
- Primary colors with 9 shade variations
- Persistent theme selection via localStorage
- Smooth transitions between themes

### API Configuration
The API helper is configured for:
- Base URL: `/api` (placeholder endpoints)
- 3 retry attempts with exponential backoff
- 5-second timeout per request
- Automatic offline detection

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features
- Collapsible sidebar on mobile
- Responsive grid layouts
- Touch-friendly interface elements
- Optimized for all screen sizes

## 🎨 Design System

### Colors
- **Primary**: Blue color ramp (50-900)
- **Secondary**: Cyan accent colors
- **Success/Warning/Error**: Semantic color system
- **Dark Mode**: Inverted color scheme

### Typography
- **Body Text**: 150% line height
- **Headings**: 120% line height
- **Font Weights**: Regular, Medium, Bold (max 3 weights)

### Animations
- **Fade In**: 0.5s ease-in-out
- **Slide In**: 0.3s ease-out
- **Portal Glow**: 2s infinite alternate
- **Spell Cast**: 1.5s infinite (loading states)

## 🔌 API Endpoints (Placeholders)

All API endpoints are placeholder implementations:

```
GET    /api/items          - Fetch all items
POST   /api/items          - Create new item
PUT    /api/items/:id      - Update item
DELETE /api/items/:id      - Delete item

GET    /api/players        - Fetch all players
POST   /api/auth/login     - User authentication
```

## 🧪 Demo Data

The application includes comprehensive seed data:
- **3 Character Classes**: Warrior, Mage, Rogue
- **Sample Items**: Weapons, armor, consumables
- **Demo Player**: Pre-configured character
- **Quest System**: Sample quests with progress tracking

## 📋 Development Guidelines

### Page Constraints
- Each page file must be ≤100 lines
- Use controller pattern for business logic
- Implement proper error boundaries

### Code Organization
- Modular file structure
- Clear separation of concerns
- TypeScript interfaces for all data structures
- Comprehensive error handling

## 🚀 Production Readiness

### Features
- **Build Optimization**: Vite-powered bundling
- **Code Splitting**: Automatic chunk splitting
- **Tree Shaking**: Dead code elimination
- **TypeScript**: Full type checking
- **ESLint**: Code quality enforcement

### Performance
- **Debounced Search**: 300ms delay for optimal UX
- **Optimistic Updates**: Instant UI feedback
- **Virtual Scrolling**: Ready for large datasets
- **Lazy Loading**: Component-based loading

## 📄 License

This template is provided as-is for educational and development purposes. Feel free to modify and extend according to your needs.

---

**Built with ❤️ using React 19, TypeScript, and modern web technologies.**

---

## 🧩 Reusable Components Guide

### Core UI Components

#### `TypeaheadInput`
A searchable dropdown input with autocomplete functionality.

```tsx
import { TypeaheadInput } from '@core/ui/TypeaheadInput';

const options = [
  { id: 1, label: 'Fire Dragon', value: 1 },
  { id: 2, label: 'Ice Golem', value: 2 }
];

<TypeaheadInput
  options={options}
  onSelect={(option) => console.log(option)}
  placeholder="Search monsters..."
  allowCustom={false}
/>
```

#### `SearchInput`
A search input with clear functionality.

```tsx
import { SearchInput } from '@core/ui/SearchInput';

<SearchInput
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search abilities..."
/>
```

#### `Pagination`
A complete pagination component with page info.

```tsx
import { Pagination } from '@core/ui/Pagination';

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={setCurrentPage}
  itemsPerPage={10}
  totalItems={100}
/>
```

### Admin Components

#### `StatsInputGroup`
Reusable component for managing statistical values.

```tsx
import { StatsInputGroup } from '@modules/Admin/AdminCommonComponents/StatsInputGroup';

<StatsInputGroup
  data={abilityData}
  onChange={setAbilityData}
  jsonFieldKey="basic_stats"
  title="Basic Stats"
  description="Base statistical bonuses"
/>
```

#### `ElementsInputGroup`
Reusable component for managing elemental values.

```tsx
import { ElementsInputGroup } from '@modules/Admin/AdminCommonComponents/ElementsInputGroup';

<ElementsInputGroup
  data={abilityData}
  onChange={setAbilityData}
  jsonFieldKey="element_mastery"
  title="Element Mastery"
  description="Elemental mastery bonuses"
/>
```

#### `AssetInput`
Component for handling file uploads and asset paths.

```tsx
import { AssetInput } from '@modules/Admin/AdminCommonComponents/AssetInput';

<AssetInput
  value={assetPath}
  onChange={setAssetPath}
  label="Icon Asset"
  description="Upload or specify path to icon"
  acceptedTypes={['image/*']}
/>
```

### Controller Pattern

#### List Controller
Manages list operations (search, sort, pagination).

```tsx
// controllers/MyListController.ts
export class MyListController {
  constructor(setState: React.Dispatch<React.SetStateAction<MyListState>>) {
    this.setState = setState;
  }

  setSearchQuery(query: string) {
    this.setState(prev => ({ ...prev, searchQuery: query, currentPage: 1 }));
  }

  setSorting(field: SortField, direction: SortDirection) {
    this.setState(prev => ({ ...prev, sortField: field, sortDirection: direction }));
  }
}

// Hook usage
export const useMyListController = () => {
  const [state, setState] = useState<MyListState>(initialState);
  const controller = new MyListController(setState);
  return { state, controller };
};
```

#### Modal Controller
Manages modal state and form operations.

```tsx
// controllers/MyModalController.ts
export class MyModalController {
  constructor(setState: React.Dispatch<React.SetStateAction<MyModalState>>) {
    this.setState = setState;
  }

  setActiveTab(tab: MyModalTab) {
    this.setState(prev => ({ ...prev, activeTab: tab }));
  }

  updateData(data: Partial<MyModel>) {
    this.setState(prev => ({ ...prev, data: { ...prev.data, ...data } }));
  }
}
```

#### Input Controller
Handles validation and formatting.

```tsx
// controllers/MyInputController.ts
export class MyInputController {
  static validateName(name: string): string | null {
    if (!name.trim()) return 'Name is required';
    return null;
  }

  static formatValue(value: string | number): number {
    return typeof value === 'string' ? parseInt(value) || 0 : value;
  }
}
```

### Usage Patterns

#### 1. List with Search, Sort, and Pagination
```tsx
function MyManagement() {
  const { state, controller, filteredItems, paginatedItems, totalPages } = useMyListController();

  return (
    <div>
      <SearchInput value={state.searchQuery} onChange={controller.setSearchQuery} />
      <MyList items={paginatedItems} onEdit={handleEdit} onDelete={handleDelete} />
      <Pagination currentPage={state.currentPage} totalPages={totalPages} onPageChange={controller.setCurrentPage} />
    </div>
  );
}
```

#### 2. Modal with Tabs and Validation
```tsx
function MyModal({ isOpen, onClose, item }) {
  const { state, controller } = useMyModalController();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TabNavigation activeTab={state.activeTab} onTabChange={controller.setActiveTab} />
      {state.activeTab === 'basic' && (
        <MyBasicTab data={state.data} onChange={controller.updateData} errors={state.errors} />
      )}
    </Modal>
  );
}
```

#### 3. Form Input with Typeahead
```tsx
function MyForm() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <TypeaheadInput
      options={itemOptions}
      onSelect={setSelectedItem}
      placeholder="Search items..."
    />
  );
}
```

### Best Practices

1. **Separation of Concerns**: Keep UI components focused on presentation, controllers handle business logic
2. **Reusability**: Design components to accept generic props and be reusable across different contexts
3. **Type Safety**: Use TypeScript interfaces for all props and state
4. **Error Handling**: Implement proper validation and error display
5. **Performance**: Use useMemo and useCallback for expensive operations
6. **Accessibility**: Include proper ARIA labels and keyboard navigation

### File Structure
```
src/
├── Core/
│   ├── ui/                     # Reusable UI components
│   └── hooks/                  # Custom hooks
├── Modules/
│   └── Admin/
│       ├── [Feature]Management/
│       │   ├── components/     # Feature-specific components
│       │   ├── controllers/    # Business logic controllers
│       │   └── [Feature]Management.tsx
│       └── AdminCommonComponents/  # Shared admin components
```