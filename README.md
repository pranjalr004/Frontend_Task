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
