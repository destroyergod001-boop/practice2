# StoryForge - Interactive Story Game

A React-based interactive story game with an admin panel for creating branching narratives. Players can make choices that affect the story outcome, and creators can build complex story structures with multiple paths and endings.

## 🚀 Features

- **Interactive Storytelling**: Players make choices that shape their adventure
- **Story Creation**: Visual story builder with node-based editing
- **Flow Visualization**: Interactive flowchart showing story structure
- **Story Analysis**: Health checks and issue detection for stories
- **Save System**: Players can save and resume their progress
- **Import/Export**: Share stories as JSON files
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Architecture Overview

The application follows a component-based architecture with clear separation of concerns:

```
src/
├── components/           # React components
│   ├── admin/           # Admin panel components
│   ├── flow/            # Story visualization components
│   ├── homepage/        # Homepage sections
│   └── ...              # Other UI components
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── main.tsx            # Application entry point
```

## 📁 File Structure & Responsibilities

### Core Application Files

#### `src/App.tsx`
**Purpose**: Main application component and state management
**Key Functions**:
- `updateStory(story)` - Updates or creates a story in the global state
- `deleteStory(storyId)` - Removes a story and its associated saves
- `saveGame(gameSave)` - Saves player progress
- `handleViewChange(view)` - Navigation between different app sections

**When to modify**: Add new global state, change navigation logic, or add new top-level features.

#### `src/main.tsx`
**Purpose**: Application entry point and React DOM rendering
**When to modify**: Change global app configuration, add providers, or modify root-level setup.

### Component Architecture

#### Layout & Navigation

##### `src/components/Layout.tsx`
**Purpose**: Main layout wrapper with navigation
**Key Features**:
- Responsive navigation bar
- View switching logic
- Consistent styling across the app

**When to modify**: Change navigation items, modify global layout, or add new views.

#### Homepage Components

##### `src/components/Homepage.tsx`
**Purpose**: Main homepage orchestrator
**Key Functions**:
- Composes all homepage sections
- Passes props to child components

##### `src/components/homepage/HeroSection.tsx`
**Purpose**: Main hero section with primary CTAs
**When to modify**: Change main messaging, primary buttons, or hero styling.

##### `src/components/homepage/StatsSection.tsx`
**Purpose**: Displays application statistics
**Props**: `storiesCount`, `savesCount`
**When to modify**: Add new statistics or change stat display format.

##### `src/components/homepage/FeaturesSection.tsx`
**Purpose**: Showcases main application features
**When to modify**: Add/remove features, change feature descriptions, or modify icons.

##### `src/components/homepage/HowItWorksSection.tsx`
**Purpose**: Explains the application workflow
**When to modify**: Update process steps or change instructional content.

##### `src/components/homepage/CallToActionSection.tsx`
**Purpose**: Final conversion section
**When to modify**: Change CTA messaging or button actions.

#### Story Library

##### `src/components/StoryLibrary.tsx`
**Purpose**: Displays available stories for players
**Key Functions**:
- `getDifficultyColor(difficulty)` - Returns color class for difficulty badges
- `getSaveForStory(storyId)` - Finds existing save for a story
- `formatDate(dateString)` - Formats dates for display

**When to modify**: Change story card layout, add filtering/sorting, or modify story metadata display.

#### Story Player

##### `src/components/StoryPlayer.tsx`
**Purpose**: Interactive story gameplay interface
**Key Functions**:
- `startGame()` - Initializes a new game session
- `loadSavedGame()` - Resumes from a saved game
- `makeChoice(choiceText, targetNodeId)` - Processes player choices
- `saveGame()` - Saves current progress
- `restartGame()` - Resets to story beginning

**When to modify**: Change gameplay mechanics, add new player features, or modify save/load behavior.

#### Admin Panel

##### `src/components/AdminPanel.tsx`
**Purpose**: Story creation and management interface
**Key Functions**:
- `createNewStory()` - Creates a new story with default structure
- `handleStoryUpdate(storyId, updates)` - Updates story data
- `handleNodeSave(storyId, nodeData)` - Saves story nodes
- `handleNodeDelete(storyId, nodeId)` - Deletes nodes with validation
- `getNodeConnections(story, nodeId)` - Calculates incoming connections

**When to modify**: Add new story creation features, change editing workflow, or add new analysis tools.

##### `src/components/StoryFormModal.tsx`
**Purpose**: Story metadata editing modal
**Key Functions**:
- `addTag()` - Adds tags to story
- `removeTag(tagToRemove)` - Removes tags from story

**When to modify**: Add new story metadata fields or change story settings.

##### `src/components/NodeFormModal.tsx`
**Purpose**: Story node editing interface
**Key Functions**:
- `addChoice()` - Adds new choice to node
- `updateChoice(index, updates)` - Modifies existing choices
- `removeChoice(index)` - Removes choices from node

**When to modify**: Add new node properties, change choice editing, or add node validation.

#### Flow Visualization

##### `src/components/flow/FlowVisualization.tsx`
**Purpose**: Interactive story structure visualization using React Flow
**Key Features**:
- Visual node representation
- Connection visualization
- Issue highlighting

**When to modify**: Change visualization style, add new node types, or modify interaction behavior.

##### `src/components/flow/StoryNodeComponent.tsx`
**Purpose**: Custom React Flow node component
**Key Functions**:
- `getNodeStyle()` - Determines node styling based on issues
- `getNodeIcon()` - Returns appropriate icon for node type

**When to modify**: Change node appearance, add new node states, or modify node interactions.

##### `src/components/flow/IssuePanel.tsx`
**Purpose**: Story health analysis and issue reporting
**Key Features**:
- Health summary statistics
- Categorized issue lists
- Quick navigation to problematic nodes

**When to modify**: Add new issue types, change analysis criteria, or modify issue display.

### Type Definitions

#### `src/types/story.ts`
**Purpose**: TypeScript interfaces for the entire application
**Key Types**:
- `Story` - Complete story structure
- `StoryNode` - Individual story scenes
- `Choice` - Player choice options
- `GameSave` - Player progress data
- `AppState` - Global application state

**When to modify**: Add new data fields, change data structure, or add new entity types.

### Utility Functions

#### `src/utils/storage.ts`
**Purpose**: Data persistence and import/export functionality
**Key Functions**:
- `loadAppState()` - Loads data from localStorage
- `saveAppState(state)` - Saves data to localStorage
- `exportStory(story)` - Downloads story as JSON file
- `importStory(file)` - Parses uploaded story files

**When to modify**: Change storage format, add data migration, or modify import/export behavior.

#### `src/utils/nodeAnalysis.ts`
**Purpose**: Story structure analysis and validation
**Key Functions**:
- `getNodeIssues(story)` - Analyzes story for structural problems
- `getStoryHealthSummary(story)` - Generates health metrics
- `isStoryPlayable(story)` - Validates story completeness
- `getRecommendedFixes(story)` - Suggests improvements

**When to modify**: Add new validation rules, change issue detection logic, or modify health metrics.

## 🔧 How to Modify Components

### Adding New Story Node Properties

1. **Update Type Definition** (`src/types/story.ts`):
```typescript
export interface StoryNode {
  // ... existing properties
  newProperty?: string; // Add your new property
}
```

2. **Update Node Form** (`src/components/NodeFormModal.tsx`):
```typescript
// Add to formData state
const [formData, setFormData] = useState({
  // ... existing fields
  newProperty: '',
});

// Add form field in JSX
<input
  value={formData.newProperty}
  onChange={(e) => setFormData(prev => ({ ...prev, newProperty: e.target.value }))}
/>
```

3. **Update Display Components** as needed to show the new property.

### Adding New Issue Types

1. **Update Analysis Logic** (`src/utils/nodeAnalysis.ts`):
```typescript
// Add new issue type to NodeIssue interface
export interface NodeIssue {
  type: 'orphaned' | 'dead_end' | 'broken_connection' | 'no_choices' | 'unreachable' | 'your_new_type';
  // ... rest of interface
}

// Add detection logic in getNodeIssues function
if (yourCondition) {
  nodeIssues.push({
    type: 'your_new_type',
    message: 'Your issue description',
    severity: 'warning',
  });
}
```

2. **Update Issue Panel** (`src/components/flow/IssuePanel.tsx`) to handle the new issue type.

### Adding New Views

1. **Update App State** (`src/types/story.ts`):
```typescript
export interface AppState {
  // ... existing properties
  currentView: 'menu' | 'admin' | 'play' | 'library' | 'your_new_view';
}
```

2. **Add Navigation** (`src/components/Layout.tsx`):
```typescript
const navItems = [
  // ... existing items
  { id: 'your_new_view', label: 'New View', icon: YourIcon },
];
```

3. **Add Route Handler** (`src/App.tsx`):
```typescript
switch (appState.currentView) {
  // ... existing cases
  case 'your_new_view':
    return <YourNewComponent />;
}
```

## 🎮 Game Flow

1. **Homepage** → Player sees overview and chooses action
2. **Library** → Player selects a story to play
3. **Player** → Interactive gameplay with choices and saves
4. **Admin** → Story creation with visual editing tools

## 🔍 Story Analysis System

The application includes a comprehensive analysis system that:
- Detects orphaned nodes (unreachable content)
- Identifies dead ends (non-ending nodes without choices)
- Finds broken connections (choices pointing to missing nodes)
- Calculates story health metrics
- Provides actionable recommendations

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Data Structure

Stories are stored as JSON objects with this structure:
```json
{
  "id": "unique-id",
  "title": "Story Title",
  "description": "Story description",
  "author": "Author Name",
  "startNodeId": "starting-node-id",
  "nodes": {
    "node-id": {
      "id": "node-id",
      "title": "Scene Title",
      "content": "Scene content",
      "choices": [
        {
          "id": "choice-id",
          "text": "Choice text",
          "targetNodeId": "target-node-id"
        }
      ],
      "isEnding": false
    }
  },
  "tags": ["tag1", "tag2"],
  "difficulty": "easy"
}
```

## 🤝 Contributing

When modifying the application:
1. Follow the existing component structure
2. Update TypeScript types when changing data structures
3. Add proper error handling
4. Update this README when adding new features
5. Test story creation and gameplay flows

## 📄 License

This project is open source and available under the MIT License.