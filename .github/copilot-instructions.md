# Mobile Control React App Core Library

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

Mobile Control React App Core is a TypeScript React library that provides building blocks for developing React apps for PepperDash Mobile Control systems. It uses Vite for building and includes React hooks for API interaction with Essentials Mobile Control Plugin, TypeScript interfaces for device state objects, and core React components for touch device interaction.

## Working Effectively

### Bootstrap, Build, and Test Commands
Run these commands in sequence to set up the development environment:

- `npm install` -- installs dependencies in ~17 seconds
- `npm run build` -- builds the library in ~11 seconds. NEVER CANCEL. Set timeout to 60+ minutes for safety.
- `npm run lint` -- runs ESLint in ~2 seconds. Always run this before committing.

### Development Commands
- `npm run dev` -- starts Vite development server in ~1 second at http://localhost:5173/
- `npm run preview` -- serves the built application for testing 
- `npm run build:local` -- builds and packages the library as .tgz file in ~12 seconds

### Build Time Expectations
- **NEVER CANCEL builds** - All build commands complete quickly but set timeouts of 60+ minutes for safety
- npm install: ~17 seconds
- npm run build: ~11 seconds  
- npm run build:local: ~12 seconds
- npm run lint: ~2 seconds
- npm run dev startup: ~1 second

## Project Structure

### Key Directories
- `src/lib/` -- Main library code (198 TypeScript files) exported as NPM package
- `src/app/` -- Development application for testing library components
- `src/components/` -- Demo components used by the test app
- `public/_local-config/` -- Configuration files for Mobile Control connection
- `dist/` -- Built library output (ES modules, UMD, CSS, TypeScript declarations)

### Core Library Structure
- `src/lib/services/` -- API services for Mobile Control communication  
- `src/lib/shared/` -- React components (buttons, hooks, providers, layout)
- `src/lib/store/` -- Redux store for room and device state management
- `src/lib/types/` -- TypeScript interfaces for Mobile Control state objects
- `src/lib/utils/` -- WebSocket context, date helpers, and utilities

### Important Files
- `src/lib/index.ts` -- Main library export file
- `src/lib/shared/MobileControlProvider/MobileControlProvider.tsx` -- Root provider component
- `src/lib/utils/WebsocketProvider.tsx` -- WebSocket connection management
- `src/lib/services/apiService.ts` -- HTTP client for Mobile Control API
- `vite.config.ts` -- Build configuration for library output
- `public/_local-config/_config.default.json` -- Default Mobile Control configuration

## Validation and Testing

### Manual Validation Requirements
After making changes, ALWAYS validate by:

1. **Build Validation**: Run `npm run build` and verify it completes without errors
2. **Lint Validation**: Run `npm run lint` and fix any issues before committing  
3. **Development Server Test**: Run `npm run dev` and verify:
   - Server starts at http://localhost:5173/
   - Application loads showing "Connecting..." message
   - No console errors in browser developer tools
   - Icon library displays with toggle buttons working

### Validation Scenarios
- **Library Build Test**: Run `npm run build:local` to verify the library packages correctly as .tgz
- **Connection Test**: The app shows "Connecting..." when no Mobile Control server is available (expected behavior)
- **Component Test**: Verify IconLibrary component displays icons with feedback/disabled toggles
- **Configuration Test**: Ensure `_config.local.json` is not committed to git (it's in .gitignore)

### No Test Suite
This project currently has no automated test suite. Manual validation through the development server is the primary testing method.

## Configuration and Setup

### Local Development Setup
1. Copy `/public/_local-config/_config.default.json` to `/public/_local-config/_config.local.json`
2. Modify the `apiPath` value to point to your test Crestron processor IP and port
3. **NEVER commit** `_config.local.json` to git (already in .gitignore)

### Mobile Control Connection
- Requires Essentials v2.x program with Mobile Control plugin v4.x
- Get connection token using `mobileinfo:[programSlot]` console command on Crestron
- Access with token: http://localhost:5173/mc/app?token=[token-value]

## CI/CD Pipeline

### GitHub Actions
- **Build workflow** (`.github/workflows/build.yaml`): Runs on every push
  - Sets up Node.js 20.x
  - Runs `npm ci` and `npm run build`
  - Deploys to NPM using semantic-release
- **CodeQL Analysis** (`.github/workflows/codeql-analysis.yml`): Security scanning

### Pre-commit Requirements
Always run before committing:
- `npm run lint` -- must pass with 0 warnings/errors
- `npm run build` -- must complete successfully

## Common Tasks

### Adding New Library Components
1. Create component in `src/lib/shared/` directory
2. Export from appropriate index.ts file 
3. Test using the development app in `src/app/`
4. Run `npm run build` to verify library builds correctly

### Working with Mobile Control Hooks
- Hooks are in `src/lib/shared/hooks/interfaces/`
- Each hook corresponds to a messenger in the Mobile Control plugin
- Use hooks in React components to interact with Crestron control systems

### Updating Dependencies
- Peer dependencies must match versions in devDependencies
- Run `npm run build` after any dependency updates
- Verify library still packages correctly with `npm run build:local`

### Common Commands Output

#### Repository Root Listing
```
.eslintrc.cjs          # ESLint configuration
.github/               # GitHub workflows and settings  
.gitignore            # Git ignore rules
.releaserc.json       # Semantic release configuration
.vscode/              # VSCode settings
README.md             # Project documentation
dist/                 # Built library output
index.html            # Development app HTML
node_modules/         # NPM dependencies  
package-lock.json     # Locked dependency versions
package.json          # Project configuration
public/               # Public assets and config
src/                  # Source code
tsconfig.json         # TypeScript configuration
tsconfig.node.json    # Node TypeScript configuration  
vite.config.ts        # Vite build configuration
```

#### Package.json Scripts
```json
{
  "dev": "vite",
  "build": "tsc && vite build", 
  "build:local": "tsc && vite build && npm pack",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview"
}
```

#### Build Output Structure
```
dist/
├── _local-config/              # Config files
├── index.d.ts                  # Main TypeScript declarations
├── mobile-control-react-app-core.css   # Bundled styles
├── mobile-control-react-app-core.es.js # ES module build
├── mobile-control-react-app-core.umd.js # UMD build
├── services/                   # Service type declarations
├── shared/                     # Component type declarations  
├── store/                      # Store type declarations
├── types/                      # Interface type declarations
└── utils/                      # Utility type declarations
```