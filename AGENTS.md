# Agent Instructions

- **Mandatory Verification:** Always check the `docs/` directory first for project-specific or cached documentation. If insufficient, use `context7` or web search to fetch the latest documentation for external libraries or APIs. Do not guess API signatures or configurations.
- **Project Structure & Context:** Always read the root `README.md` and any sub-project `README.md` files to understand the project's purpose, architecture, and specific development workflows.
- **Next.js Version Warning:** This is not a standard Next.js release. Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices because APIs, conventions, and file structure may differ from prior versions.

# Project Overview

This is a Next.js app for Shark Council.

# Project Stack

- **Next.js**: Core framework for server-side rendering and routing.
- **React**: UI library for building modular components.
- **TypeScript**: Type-safe development environment.
- **Tailwind CSS**: Utility-first styling framework.
- **shadcn/ui**: Accessible and customizable UI component primitives.
- **Axios**: Promise-based HTTP client for making API requests.
- **viem**: TypeScript interface for Ethereum, used for blockchain interactions and wallet integration.
- **Uniswap API**: Service for programmatically executing token swaps and managing trades.
- **ENS**: Ethereum Name Service protocol utilized as the discovery, identity, and reputation layer for the AI agents.
- **LangChain**: Framework for developing applications powered by language models, used to build the orchestration and agent debate logic.
- **OpenRouter**: Unified API gateway for accessing various Large Language Models (LLMs) that power the agents.

# Project Structure

- `app/`: Next.js App Router directory, containing frontend pages (e.g., debates, agent listings) and backend API routes.
  - `app/api/`: Backend endpoints, including the orchestration logic, individual agent APIs, and Uniswap integration.
- `components/`: React components, organized by domain (e.g., `debates/`, `sidebar/`, `providers/`) and foundational UI components (`ui/` from shadcn).
- `config/`: Core configuration files for the app, agents, debates, and Uniswap settings.
- `docs/`: Project-specific documentation and context files tailored for LLMs (e.g., shadcn, Uniswap guides).
- `hooks/`: Custom React hooks (e.g., `use-mobile.ts`).
- `lib/`: Core application logic, utilities, and external integrations.
  - `lib/agents/`: Implementations for the various AI agents (orchestrator, quant-expert, sentiment-expert, executor).
  - Also includes helpers for API requests, ENS resolution, Uniswap execution, and wallet management.
- `public/`: Static assets, including images, icons, and mock data files.
- `styles/`: Global CSS stylesheets.
- `types/`: TypeScript interface and type definitions for strong typing across the app.
