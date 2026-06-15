# App Graph Builder

A modern React-based application for building and visualizing graphs with an intuitive user interface. This project is built with React, TypeScript, and Vite for optimal performance and developer experience.

## Features

- **React 19** - Latest React version with improved performance
- **TypeScript** - Full type safety and enhanced developer experience
- **Vite** - Lightning-fast build tool and development server
- **ESLint** - Code quality and consistency enforcement
- **Modern Tooling** - Industry-standard development tools

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** - Version 18.x or higher ([Download](https://nodejs.org/))
- **npm** - Version 9.x or higher (comes with Node.js)
- **Git** - For version control ([Download](https://git-scm.com/))

You can verify your installations by running:

```bash
node --version
npm --version
git --version
```

## Installation

1. **Clone or navigate to the project directory:**

```bash
cd Frontend_Task/app-graph-builder
```

2. **Install dependencies:**

```bash
npm install
```

This will install all the required packages listed in `package.json`, including React, React DOM, TypeScript, Vite, and development tools.

## Setup & Project Structure

### Project Structure

```
app-graph-builder/
├── src/
│   ├── App.tsx           # Main React component & graph orchestrator
│   ├── App.css           # Main component styles
│   ├── main.tsx          # Application entry point & providers setup
│   ├── index.css         # Global styles with Tailwind directives
│   ├── assets/           # Static assets and images
│   ├── api/
│   │   └── mockApi.ts    # Mock API with React Query hooks
│   ├── store/
│   │   └── useAppStore.ts # Zustand state management store
│   └── components/
│       ├── InspectorPanel.tsx     # Node inspection & configuration panel
│       └── nodes/
│           ├── ServiceNode.tsx    # Service node component (indigo theme)
│           └── DbNode.tsx         # Database node component (teal theme)
├── public/               # Static files served as-is
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration with React & Tailwind
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # App-specific TypeScript settings
├── tsconfig.node.json    # Node-specific TypeScript settings
├── eslint.config.js      # ESLint configuration with React rules
├── tailwind.config.js    # Tailwind CSS theme customization
├── postcss.config.js     # PostCSS configuration for Tailwind
├── package.json          # Project dependencies and scripts
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

### Configuration Files

- **vite.config.ts** - Build tool configuration
- **tsconfig.json** - TypeScript compiler options
- **tsconfig.app.json** - App-specific TypeScript settings
- **tsconfig.node.json** - Node-specific TypeScript settings
- **eslint.config.js** - Code quality rules

## File Descriptions

### Root Level Files

#### `package.json`
Contains project metadata, dependencies, and npm scripts. Defines the project name, version, and all required packages for both development and production environments.

**Key sections:**
- `scripts` - NPM commands for development, building, linting, and preview
- `dependencies` - Production dependencies (React, React DOM)
- `devDependencies` - Development tools (TypeScript, Vite, ESLint, PostCSS, Tailwind)

#### `vite.config.ts`
Vite configuration file that defines how the project is built and served during development. It specifies the React plugin for proper JSX handling and optimization settings.

#### `tsconfig.json`
Main TypeScript configuration file that sets compiler options for the entire project. Extends from base configuration with strict type checking enabled.

#### `tsconfig.app.json`
App-specific TypeScript configuration that extends the main tsconfig.json with settings optimized for application source files in the `src/` directory.

#### `tsconfig.node.json`
Node-specific TypeScript configuration for build tools and scripts that run in the Node.js environment.

#### `eslint.config.js`
ESLint configuration file that enforces code quality and consistency standards. Includes rules for React and React Hooks best practices.

**Includes:**
- JavaScript linting rules
- React plugin rules
- React Hooks exhaustive-deps rules
- React Refresh rules for HMR support

#### `tailwind.config.js`
Tailwind CSS configuration file that customizes the styling framework. Defines content paths for Tailwind to scan and custom theme extensions.

**Key settings:**
- `content` - Paths where Tailwind looks for class names to include in the final build
- `theme.extend.fontFamily` - Custom font configurations (Inter, system fonts, and monospace options)

#### `.gitignore`
Specifies files and folders that should not be committed to version control, including node modules, build outputs, and environment files.

#### `index.html`
Entry HTML file that serves as the template for the application. Contains the root div where React mounts the application.

#### `postcss.config.js`
PostCSS configuration file that enables Tailwind CSS and Autoprefixer for CSS processing during the build.

### Source Files (`src/` Directory)

#### `main.tsx`
Application entry point that:
- Imports React and ReactDOM
- Imports global styles (index.css)
- Sets up React Query with `QueryClient` for server state management
- Wraps the `<App />` component with `QueryClientProvider`
- Renders the application into the root element with React.StrictMode

This file is executed first when the application starts and initializes all global providers.

#### `App.tsx`
Main React component that serves as the root of the application. Contains the primary structure and layout of the graph builder application.

**Responsibilities:**
- Defines the overall app structure
- Manages top-level state and logic
- Renders child components

#### `index.css`
Global stylesheet that applies to the entire application. Contains Tailwind CSS directives and global styling rules.

**Key configurations:**
- Tailwind base, components, and utilities imports
- Dark theme body styling (`bg-[#09090b]` dark background, white text)
- React Flow custom styling for handles and nodes
- Anti-aliased text rendering
- Overflow hidden to prevent scrollbars

#### `App.css`
Component-specific styles for the App component. Contains styling rules isolated to the App component and its children.

#### `assets/` Directory
Contains static assets such as images, icons, and other media files used throughout the application.

### Store Files (`src/store/` Directory)

#### `useAppStore.ts`
Zustand-based state management store that manages global application state. This is the single source of truth for app-wide state that needs to persist across component re-renders.

**State Properties:**
- `selectedAppId` - Currently selected application identifier
- `selectedNodeId` - Currently selected node in the graph
- `isMobilePanelOpen` - Toggle state for mobile inspector panel
- `activeInspectorTab` - Active tab in the inspector panel (Config or Runtime)
- `appGraphs` - Dictionary storing graphs for each application with their nodes and edges

**Store Methods:**
- `setSelectedAppId(id)` - Updates the selected app and resets node selection
- `setSelectedNodeId(id)` - Updates the selected node and auto-opens the mobile panel
- `setIsMobilePanelOpen(open)` - Controls the visibility of the mobile inspector panel
- `setActiveInspectorTab(tab)` - Switches between inspector tabs
- `setGraphData(appId, nodes, edges)` - Stores graph data for an application
- `updateNodeData(appId, nodeId, fields)` - Updates specific node properties
- `deleteNode(appId, nodeId)` - Removes a node and its connected edges from the graph

### API & Mock Data (`src/api/` Directory)

#### `mockApi.ts`
Provides mock API endpoints and React Query hooks for data fetching. Simulates server responses with realistic delays for demonstration and development purposes.

**Mock Data:**
- `MOCK_APPS` - Array of predefined applications with IDs, names, and icons
- `INITIAL_GRAPHS` - Pre-populated graph data with nodes (Postgres, Redis, MongoDB) and edges showing service connections

**React Query Hooks:**
- `useAppsQuery()` - Fetches the list of available applications (500ms delay)
- `useGraphQuery(appId)` - Fetches and caches graph data for a specific application (600ms delay)
  - Automatically syncs fetched data into Zustand store
  - Only fetches if data not already cached
  - Enabled only when appId is provided

**Mock Node Properties:**
- `label` - Service name
- `status` - Health status (Success, Error, Degraded)
- `cost` - Hourly cost in dollars
- `metricType` - Performance metric being tracked (CPU, Memory, Disk, Region)
- `metricValue` - Current metric percentage (0-100)

### Component Files (`src/components/` Directory)

#### `ServiceNode.tsx`
Custom React Flow node component for rendering service nodes (e.g., Postgres, Redis, MongoDB) in the graph visualization with a purple/indigo theme.

**Features:**
- **Header Section**: Displays service icon, label, and hourly cost badge
- **Metric Tabs**: Interactive tabs for switching metrics (CPU, Memory, Disk, Region)
- **Usage Visualization**: 
  - Gradient progress bar showing metric usage percentage
  - Color gradient: blue → emerald → amber → rose
  - Real-time percentage display
- **Status Badge**: Shows operational health with color coding
  - `Success` - Green (emerald) background
  - `Degraded` - Amber background
  - `Error` - Red (rose) background
- **Interactive Elements**:
  - Source and target handles for connecting edges
  - Settings icon button for potential future configurations
  - Cloud provider badge (AWS indicator)
- **Selection State**:
  - Border changes to indigo-500 when selected
  - Ring effect with indigo/20% opacity
  - Smooth transitions on all interactions

**Properties (Data Interface):**
- `label` (string) - Service name display
- `status` (string) - Current operational status
- `cost` (number) - Hourly cost in dollars
- `metricType` (string) - Type of metric being monitored
- `metricValue` (number) - Current metric percentage (0-100)

**Styling:**
- Dark background (`#0d0d0e`) with rounded corners
- Width: 320px for optimal visibility
- Uses Tailwind CSS utilities exclusively
- Fully integrated with Zustand store for state updates

#### `DbNode.tsx`
Custom React Flow node component for rendering database nodes (e.g., databases, caches) in the graph visualization with a teal/cyan theme.

**Features:**
- **Cylindrical Accent**: 3D cylindrical top decoration matching database aesthetics
- **Header Section**: Displays database icon, label, and operational information
- **Metric Tabs**: Interactive tabs for database-specific metrics (Usage, Storage, IOPs, Replicas)
- **Usage Visualization**:
  - Gradient progress bar with teal starting color
  - Color gradient: teal → emerald → amber → rose
  - Real-time percentage display in monospace font
- **Status Badge**: Shows database health with color coding
  - `Success` - Green (emerald) background
  - `Degraded` - Amber background
  - `Error` - Red (rose) background
- **Interactive Elements**:
  - Source and target handles for connecting edges
  - Settings icon button
  - Cloud provider badge (AWS indicator)
  - Teal accent color in icon element
- **Selection State**:
  - Border changes to teal-500 when selected
  - Ring effect with teal/20% opacity
  - Smooth transitions on selection

**Properties (Data Interface):**
- `label` (string) - Database name display
- `status` (string) - Current operational status
- `cost` (number) - Hourly cost in dollars
- `metricType` (string) - Type of database metric (Usage, Storage, IOPs, Replicas)
- `metricValue` (number) - Current metric percentage (0-100)

**Styling:**
- Dark background (`#0d0d0e`) with rounded corners
- Width: 280px (slightly narrower than ServiceNode)
- Rounded top and enhanced bottom corners
- Uses Tailwind CSS utilities exclusively
- Database-specific teal color scheme throughout

#### `InspectorPanel.tsx`
Side panel component for inspecting and editing properties of selected nodes in the graph. Provides dual-tab interface for configuration and runtime information.

**Tab Interfaces:**

**Config Tab:**
- Displays the selected node's operational health status
- Status selector - Choose between Success, Degraded, and Error states
- Service/Database Label Context - Text input for editing node name
- Usage metric controls:
  - **Slider input** - Visual drag-based metric adjustment (0-100%)
  - **Numeric input** - Precise value entry with min/max validation
  - Real-time percentage display
- **Description field** - Multi-line textarea for internal functional specifications

**Runtime Tab:**
- Read-only node metadata display
- Shows node information in monospace font for technical clarity

**Adaptive UI Features:**
- Automatically detects node type (Service vs Database) based on metricType
- Adjusts header title based on node type:
  - **Service Core Inspector** for service nodes (indigo theme)
  - **Database Core Inspector** for database nodes (teal theme)
- Dynamic color scheme matching the selected node type
- Colored status indicators (● bullet point in matching theme color)

**Responsive Design:**
- Full-height scrollable panel on desktop (`hidden lg:block`)
- Desktop panel width: 360px positioned absolutely on the right
- Mobile slide-over bottom sheet for small screens
- Auto-opens on mobile when a node is selected
- Close button (✕) available on mobile view
- Smooth transitions and backdrop blur effect

**Data Persistence:**
- Real-time synchronization with Zustand store
- All edits immediately update the graph state
- Changes persist across navigation and selections
- Supports both ServiceNodeData and DbNodeData interfaces

**Type Helpers:**
- Service metrics: CPU, Memory, Disk, Region
- Database metrics: Usage, Storage, IOPs, Replicas

## Recently Added Files - Integration Guide

This section documents the new files added to the project and how they work together to create a cohesive graph visualization and node inspection system.

### Architecture Overview

The project uses a **layered architecture** with clear separation of concerns:

```
User Interface Layer (Components)
    ├── App.tsx (Main orchestrator)
    ├── ServiceNode.tsx (Service visualization)
    ├── DbNode.tsx (Database visualization)
    └── InspectorPanel.tsx (Node configuration)
         │
State Management Layer
    ├── useAppStore.ts (Zustand store)
    └── main.tsx (React Query provider)
         │
API & Data Layer
    └── mockApi.ts (React Query hooks)
```

### Step-by-Step Integration

#### Step 1: Application Bootstrap (`main.tsx` → `App.tsx`)

**main.tsx** initializes the application with:
1. React Query client setup for server state management
2. Wrapping the App with QueryClientProvider
3. Loading global CSS styles (index.css)
4. Mounting React application in strict mode

**App.tsx** then:
1. Wraps components with ReactFlowProvider for graph context
2. Initializes data fetching via `useAppsQuery()` and `useGraphQuery()`
3. Sets up keyboard shortcuts (F for fit, P for panel toggle, Delete for node removal)
4. Renders the main layout: left rail + header + canvas + inspector panel

#### Step 2: State Management (`useAppStore.ts`)

The Zustand store is the single source of truth, managing:

```typescript
// Application Context
selectedAppId          // Which app is currently viewed
selectedNodeId         // Which node is selected
isMobilePanelOpen      // Inspector panel visibility on mobile
activeInspectorTab     // Currently active inspector tab (config/runtime)

// Graph Data
appGraphs              // Record of all loaded graphs by app ID
  └─ nodes             // Array of node objects
  └─ edges             // Array of connection objects
```

**Data Flow:**
1. User selects an app → `setSelectedAppId()` → resets node selection
2. Canvas loads graph → `setGraphData()` → stores nodes and edges
3. User clicks node → `setSelectedNodeId()` → opens inspector panel
4. User edits node → `updateNodeData()` → updates store → UI re-renders

#### Step 3: Data Loading (`mockApi.ts`)

Two React Query hooks provide data:

**useAppsQuery()**
- Fetches list of available applications
- 500ms simulated delay
- Data cached indefinitely until manually invalidated
- Returns: `{data, isLoading, isError}`

**useGraphQuery(appId)**
- Fetches graph for selected app
- 600ms simulated delay
- Only fetches if data not already in store
- Auto-syncs fetched data to Zustand store via `setGraphData()`
- Returns: `{data, isLoading, isError}`

**Data Structure:**
```typescript
MOCK_APPS: [
  { id: 'supertokens-golang', name: 'supertokens-golang', icon: '💡' },
  { id: 'supertokens-java', name: 'supertokens-java', icon: '⚙️' },
  { id: 'supertokens-python', name: 'supertokens-python', icon: '🚀' },
]

INITIAL_GRAPHS: {
  'supertokens-golang': {
    nodes: [
      { id: 'postgres', type: 'serviceNode', ... },
      { id: 'redis', type: 'serviceNode', ... },
      { id: 'mongodb', type: 'serviceNode', ... },
    ],
    edges: [
      { id: 'e1-2', source: 'postgres', target: 'redis', ... },
    ]
  }
}
```

#### Step 4: Node Visualization

React Flow renders nodes using custom node types registered in App.tsx:

```typescript
const nodeType = {
  serviceNode: ServiceNode,
  dbNode: DbNode
}
```

**ServiceNode.tsx workflow:**
1. Receives node data from React Flow
2. Destructures props: `{ id, data, selected }`
3. Accesses Zustand store for selectedAppId and updateNodeData function
4. Renders interactive UI with metric tabs and status badge
5. Handles metric tab clicks → updates store via `updateNodeData()`
6. Conditional styling based on selection state

**DbNode.tsx workflow:**
1. Similar to ServiceNode but with database-specific styling
2. Uses teal color scheme instead of indigo
3. Different metric tabs (Usage, Storage, IOPs, Replicas)
4. Includes cylindrical accent decoration
5. Handles all interactions via store updates

#### Step 5: Node Inspection (`InspectorPanel.tsx`)

When a node is selected:

1. **Panel Opening:**
   - Desktop: Side panel always visible
   - Mobile: Bottom sheet slides up with backdrop blur
   - Auto-opening handled by `setSelectedNodeId()`

2. **Node Detection:**
   - Finds selected node from store's current graph
   - Displays empty state if no node selected

3. **UI Adaptation:**
   - Detects node type via `metricType` value
   - Service nodes: Purple/indigo theme
   - Database nodes: Teal/cyan theme
   - Adjusts available metrics accordingly

4. **Config Tab:**
   - Status selector with visual color indicators
   - Label editor with real-time sync
   - Metric slider with validated input (0-100%)
   - Numeric input for precise value entry
   - Description textarea for notes

5. **Data Updates:**
   - All changes trigger `updateNodeData()` in store
   - Store updates node data immutably
   - React Flow automatically re-renders with new data
   - Changes visible immediately in the node

#### Step 6: Event Handling & Interactions

**Keyboard Shortcuts** (handled in App.tsx):
- **F** - Fit view (zoom to show all nodes)
- **P** - Toggle inspector panel on mobile
- **Delete/Backspace** - Remove selected node

**Mouse Interactions:**
- **Click node** - Select node → open inspector panel
- **Drag node** - Move node on canvas (React Flow handles)
- **Click metric tab** - Switch metric type → update store
- **Drag slider** - Adjust metric value → update store
- **Type in inputs** - Update node properties → persist in store

### Complete Data Flow Example

User selecting and editing a service node:

```
1. User clicks Postgres node on canvas
   └─ React Flow triggers onNodesChange with selected=true
   
2. App.tsx receives change event
   └─ Calls setSelectedNodeId('postgres')
   
3. Zustand store updates
   └─ selectedNodeId = 'postgres'
   └─ isMobilePanelOpen = true (auto-open)
   
4. InspectorPanel.tsx re-renders
   └─ Finds postgres node data from store
   └─ Displays Config tab with all current values
   
5. User changes CPU metric from tab selection
   └─ ServiceNode.tsx metric tab clicked
   └─ Calls updateNodeData(appId, 'postgres', { metricType: 'CPU' })
   
6. Zustand store updates postgres node
   └─ Re-renders node with new metric type
   └─ InspectorPanel re-renders with updated content
   
7. User adjusts metric slider to 75%
   └─ InspectorPanel.tsx slider onChange triggered
   └─ Calls updateNodeData(appId, 'postgres', { metricValue: 75 })
   
8. Graph updates immediately
   └─ Progress bar fills to 75%
   └─ Numeric display shows 75%
```

### File Dependencies

```
main.tsx
  ├─ imports: App.tsx, index.css, React Query
  └─ provides: QueryClient, React providers

App.tsx
  ├─ imports: ServiceNode, DbNode, InspectorPanel, useAppStore, useGraphQuery, useAppsQuery
  ├─ provides: Graph visualization, keyboard shortcuts, node management
  └─ uses: ReactFlow, React Flow Provider

InspectorPanel.tsx
  ├─ imports: useAppStore
  ├─ provides: Node configuration UI
  └─ uses: Zustand store for state and updates

ServiceNode.tsx
  ├─ imports: useAppStore
  ├─ provides: Service node rendering
  └─ uses: Zustand store for app context and updates

DbNode.tsx
  ├─ imports: useAppStore
  ├─ provides: Database node rendering
  └─ uses: Zustand store for app context and updates

mockApi.ts
  ├─ imports: React Query, useAppStore
  ├─ provides: useAppsQuery(), useGraphQuery()
  └─ uses: Mock data, Zustand store for cache

useAppStore.ts
  ├─ imports: Zustand
  ├─ provides: Global state management
  └─ uses: TypeScript interfaces for type safety
```

### Running the Application with New Files

#### Development Setup:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser at http://localhost:5173
```

#### Building for Production:

```bash
# 1. Build the project
npm run build

# 2. Preview production build locally
npm run preview
```

### Adding New Features Using This Architecture

#### Example: Add a new node type
1. Create `src/components/nodes/CustomNode.tsx`
2. Import `useAppStore` and extend the node interface
3. Register in App.tsx: `nodeTypes.customNode = CustomNode`
4. Use in graph data: `{ type: 'customNode', ... }`

#### Example: Add new inspector tab
1. Add tab name to Zustand store state
2. Update `setActiveInspectorTab()` to handle new tab
3. Add tab button in `InspectorPanel.tsx`
4. Render conditional content for new tab

#### Example: Persist data to backend
1. Replace mock API with real endpoints in `mockApi.ts`
2. Update `useGraphQuery` to make API calls
3. Add mutation hooks for create/update/delete operations
4. Trigger mutations from component event handlers



## Styling & Theming

This project uses **Tailwind CSS** for utility-first styling with a custom dark theme configuration:

- **Dark background**: `#09090b` (nearly black)
- **Text color**: White for high contrast
- **Font**: Inter font family with system-ui fallback for optimal readability
- **Responsive**: Fully responsive design using Tailwind's responsive utilities

### Customizing Styles

1. **Global styles**: Edit `src/index.css` for application-wide styling
2. **Component styles**: Edit `src/App.css` for App component-specific styles
3. **Tailwind config**: Modify `tailwind.config.js` to customize theme colors, fonts, and utilities
4. **Tailwind classes**: Use utility classes directly in JSX elements following Tailwind conventions

## Best Practices for Working with New Files

### State Management (useAppStore.ts)

**Do's:**
- ✅ Use the store for app-wide state that multiple components need
- ✅ Keep mutations focused - update only what changed
- ✅ Use store selectors to avoid unnecessary re-renders
- ✅ Always reset related state when changing context (e.g., reset node when app changes)

**Don'ts:**
- ❌ Don't store local component state in the store
- ❌ Don't mutate store state directly without using actions
- ❌ Don't fetch data directly in store (use React Query instead)
- ❌ Don't store derived values (compute them instead)

```typescript
// Good - Using selectors for performance
const selectedNodeId = useAppStore((state) => state.selectedNodeId);

// Less optimal - Subscribes to entire store
const { selectedNodeId } = useAppStore();
```

### Data Fetching (mockApi.ts)

**Do's:**
- ✅ Use React Query hooks for server state management
- ✅ Enable queries only when data is needed
- ✅ Leverage caching to avoid redundant requests
- ✅ Sync fetched data to Zustand for offline access

**Don'ts:**
- ❌ Don't fetch in components without React Query
- ❌ Don't create multiple query hooks for the same data
- ❌ Don't manually manage loading/error states

```typescript
// Good - Data fetched only when needed
const { data, isLoading, isError } = useGraphQuery(selectedAppId);

// The hook automatically syncs to store when needed
```

### Node Components (ServiceNode.tsx & DbNode.tsx)

**Do's:**
- ✅ Keep components pure - same props = same UI
- ✅ Use store selectors for app context only
- ✅ Stop event propagation on interactive elements
- ✅ Use Tailwind for all styling
- ✅ Maintain consistent prop interfaces

**Don'ts:**
- ❌ Don't fetch data in node components
- ❌ Don't modify parent component state
- ❌ Don't use inline styles (use Tailwind instead)
- ❌ Don't add complex business logic in components

```typescript
// Good - Component stays simple and reusable
onClick={(e) => {
  e.stopPropagation();
  handleMetricTabChange(tab);
}}

// Component receives data and renders
const { label, status, cost } = data;
```

### Inspector Panel (InspectorPanel.tsx)

**Do's:**
- ✅ Only display info for currently selected node
- ✅ Validate numeric inputs (keep between 0-100%)
- ✅ Show empty state when no node selected
- ✅ Respect mobile/desktop responsive requirements
- ✅ Keep operations real-time for immediate feedback

**Don'ts:**
- ❌ Don't allow invalid states (negative values, invalid status)
- ❌ Don't show outdated information
- ❌ Don't block user input waiting for async operations
- ❌ Don't render inspector for unselected nodes

```typescript
// Good - Validate before updating
const handleValueChange = (val: number) => {
  updateNodeData(appId, nodeId, {
    metricValue: Math.max(0, Math.min(100, val))
  });
};
```

### Adding New Nodes

When adding new node types:

1. **Create node component** in `src/components/nodes/`
2. **Define data interface** in `useAppStore.ts` (e.g., `CustomNodeData`)
3. **Register in App.tsx**:
   ```typescript
   const nodeType = {
     serviceNode: ServiceNode,
     dbNode: DbNode,
     customNode: CustomNode  // Add here
   };
   ```
4. **Use consistent styling** - Follow ServiceNode/DbNode patterns
5. **Add to mockApi.ts** - Include in mock data if needed

### Extending the Inspector Panel

When adding new inspector features:

1. **Add to store** - Add new tab or state in `useAppStore.ts`
2. **Create UI components** - Follow existing tab patterns
3. **Connect to store** - Use selectors and update actions
4. **Validate inputs** - Ensure data consistency
5. **Test responsiveness** - Check mobile and desktop layouts

### Type Safety

Always define proper TypeScript interfaces:

```typescript
// Define node data types
export interface ServiceNodeData {
  label: string;
  status: 'Success' | 'Degraded' | 'Error';
  cost: number;
  metricType: string;
  metricValue: number;
  description?: string;
}

// Use in components
const data: ServiceNodeData = nodeData;
```

## Troubleshooting

### Node selection not working
- Check if `selectedNodeId` is being set in store
- Verify `onNodesChange` callback is firing in App.tsx
- Inspect React Flow's node selection state

### Inspector panel not showing
- Verify node is selected: `selectedNodeId !== null`
- Check mobile panel visibility: `isMobilePanelOpen` on mobile
- Ensure desktop panel is not hidden by other elements

### Data not persisting on page reload
- Current implementation is session-only (in-memory store)
- To add persistence: use Zustand middleware with localStorage
- To sync with backend: replace mockApi with real API calls

### Performance issues with large graphs
- Limit visible nodes using virtualization
- Use React.memo() on node components
- Optimize re-renders with proper selector usage
- Consider pagination or filtering

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## Project Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.x | UI library |
| typescript | 5.x | Type safety |
| vite | 6.x | Build tool |
| zustand | Latest | State management |
| @tanstack/react-query | Latest | Server state |
| @xyflow/react | Latest | Graph visualization |
| tailwindcss | 3.x | Styling framework |
| eslint | 9.x | Code quality |
| postcss | 8.x | CSS processing |

## License

This project is part of the Frontend Task series. See LICENSE file for details.

## Support & Contribution

For issues, questions, or contributions:

1. Check existing documentation in this README
2. Review component prop interfaces and types
3. Test changes with `npm run dev`
4. Ensure linting passes with `npm run lint`
5. Follow the established code patterns and conventions

## Key Dependencies & Libraries

### State Management

**Zustand** - Lightweight state management library used for:
- Managing application state (`useAppStore`)
- Persisting selected app/node information
- Storing graph data for multiple applications
- Simple, hook-based API for subscribing to state changes

**React Query (@tanstack/react-query)** - Server state management for:
- Caching API responses
- Managing loading and error states
- Automatic data synchronization
- Lazy-loading graph data on demand

### Graph Visualization

**React Flow (@xyflow/react)** - Interactive graph visualization library for:
- Rendering nodes and edges
- Handling drag-and-drop interactions
- Pan and zoom functionality
- Custom node types support (CustomServiceNode)

### Styling

**Tailwind CSS** - Utility-first CSS framework for:
- Rapid UI development
- Consistent dark theme implementation
- Responsive design
- Pre-defined color and spacing scales

## Architecture Overview

### Data Flow

1. **User Selects App** → Updates `selectedAppId` in Zustand store
2. **Graph Data Fetch** → React Query fetches and caches data
3. **Store Sync** → Data automatically syncs to Zustand store
4. **Render Graph** → React Flow renders nodes from store
5. **User Selects Node** → Updates `selectedNodeId` in Zustand store
6. **Inspector Panel** → Displays node data from store
7. **Edit Node** → Updates node via `updateNodeData` in store
8. **Re-render** → Components automatically update from store

### State Management Strategy

- **Global State (Zustand)**: Selected app, selected node, UI state (panel visibility, active tabs)
- **Server State (React Query)**: API responses and cached data
- **Component Local State**: Form inputs, temporary UI state

## Available Scripts

### Development Server

```bash
npm run dev
```

Starts the development server with hot module reloading (HMR). The application will typically run on `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Compiles TypeScript and bundles the application for production. Output files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

### Lint Code

```bash
npm run lint
```

Runs ESLint to check for code quality issues and consistency. This helps maintain clean, standards-compliant code.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

4. Start developing! The application will automatically reload when you make changes.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

Then preview it:

```bash
npm run preview
```

## Technology Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19.2.6 | UI library |
| TypeScript | ~6.0.2 | Static typing |
| Vite | 8.0.12 | Build tool & dev server |
| ESLint | 10.3.0 | Code linting |

## Development Workflow

1. Make changes to files in the `src/` directory
2. The development server automatically reloads changes (HMR)
3. Run `npm run lint` to check code quality
4. Run `npm run build` to create a production bundle
5. Commit changes with `git` when ready

## Troubleshooting

### Dependencies not installing?
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Port already in use?
- The development server will try alternative ports
- Or specify a custom port: `npm run dev -- --port 3000`

### TypeScript errors?
- Ensure TypeScript is properly installed: `npm install`
- Clear editor cache and restart your IDE

## License

This project is part of the Frontend Task series.

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.
