# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sudokulator is a Killer Sudoku Calculator built with TanStack Start (React framework) and TypeScript. It aims to improve upon existing calculators with better UX, including no distracting text blocks, no dropdowns for sum changes, and optional "must include" digits.

## Development Commands

**IMPORTANT**: All commands should be run only via the corresponding make targets. Do not use direct bun/bunx commands.

- **Start dev server**: `make dev` (runs on port 3000)
- **Build**: `make build`
- **Run tests**: `make test`
- **Watch tests**: `make watch`
- **Lint**: `make lint`
- **Format**: `make fmt`
- **Show Makefile help**: `make help`

If you need changes or additions to the available commands, ask the user and we will discuss.

The project uses Bun as the primary runtime and package manager.

## Architecture

**Frontend Framework**: TanStack Start with React 19 and TypeScript
**Routing**: File-based routing with TanStack Router (`src/routes/`)
**Styling**: TailwindCSS v4 with gradient-based design system
**Build Tool**: Vite with multiple plugins (TanStack Start, Nitro, React, etc.)
**Testing**: Vitest with React Testing Library and JSDOM

### Key File Structure

- `src/routes/`: File-based routing (index.tsx is homepage, __root.tsx is shell)
- `src/components/`: Reusable React components like Header with navigation
- `src/data/`: Data files and constants
- `vite.config.ts`: Vite configuration with TanStack Start, Nitro, and other plugins
- `routeTree.gen.ts`: Auto-generated route tree (don't edit manually)

### Path Aliases

The project uses `@/*` as an alias for `./src/*` configured in tsconfig.json and vite.config.ts.

### Development Tools

- TanStack DevTools and Router DevTools are available in development
- ESLint with TypeScript, React, and import plugins
- Prettier for code formatting
- Strict TypeScript configuration with no unused parameters/locals

## Current State

The app currently shows a minimal homepage with a single "Documentation" button. The navigation includes demo pages for TanStack Start features (server functions, API requests, SSR modes). The actual Killer Sudoku calculator functionality appears to be in development.