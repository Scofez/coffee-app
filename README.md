# Coffee Order

A lightweight TypeScript-based backend for managing coffee orders.

## 🧩 Overview
This project provides a simple HTTP API for creating, listing, and managing coffee orders. It is designed as a small demo or starting point for building a coffee ordering service with a minimal stack.

## 🚀 Features
- Create a new coffee order
- List existing orders
- Simple in-memory (or file-based) storage for quick development

## 🛠️ Getting Started
### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Install dependencies
```bash
pnpm install
```

### Run the app
```bash
pnpm start
```

## 🔧 Project Structure
- `index.ts` - entry point for the server
- `db.ts` - data access and storage logic
- `initDb.ts` - database initialization helper
- `types.ts` - shared TypeScript types

## 🧪 Testing
No tests are included yet, but using a test runner such as Vitest or Jest is a good next step.

## 📌 Notes
This repo is intended as a starting point; feel free to extend it with authentication, persistence, and additional API endpoints.

