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
│   ├── App.tsx           # Main React component
│   ├── App.css           # Main component styles
│   ├── main.tsx          # Application entry point
│   ├── index.css         # Global styles
│   └── assets/           # Static assets
├── public/               # Static files served as-is
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.js      # ESLint configuration
└── package.json          # Project dependencies and scripts
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

#### `CustomServiceNode.tsx`
Custom React Flow node component for rendering service/database nodes in the graph visualization.

**Features:**
- Displays service information with icon and label
- Shows hourly cost in a compact badge
- Interactive metric selector tabs (CPU, Memory, Disk, Region)
- Visual metric usage bar with gradient coloring (blue → green → red)
- Status badge with appropriate color coding:
  - `Success` - Green (emerald)
  - `Degraded` - Amber (yellow)
  - `Error` - Red (rose)
- Source and target handles for connecting edges
- Responsive selection highlighting with indigo border and ring effect
- Cloud provider badge (AWS)

**Styling:**
- Dark background (`#0d0d0e`)
- 320px width with rounded corners
- Uses Tailwind CSS for all styling
- Integrates with Zustand store for state updates

#### `InspectorPanel.tsx`
Side panel component for inspecting and editing properties of selected nodes in the graph.

**Features:**
- Displays selected node information or empty state message
- Tabbed interface:
  - **Config Tab**: Edit node properties (status, name, usage metrics)
  - **Runtime Tab**: View node metadata (ID, position coordinates)
  
**Config Tab Controls:**
- Status selector - Choose between Success, Degraded, and Error states
- Node name input - Edit the service node label
- Usage metric slider - Visual slider to adjust performance metrics
- Numeric input - Precise metric value input with min/max validation (0-100)

**Responsive Design:**
- Full-height panel with scrollable content area
- Top header with close button for mobile devices
- Mobile-specific close button using `lg:hidden`
- Integrates with Zustand store for data persistence
- Auto-opens on mobile when a node is selected

### Public Directory

#### `public/`
Directory for static files that are served as-is without processing. Files here are not modified during the build process.

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
