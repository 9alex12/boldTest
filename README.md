# BoldTest - Next.js App

This project is a web application built with [Next.js](https://nextjs.org) and TypeScript, designed to visualize and filter sales transactions using different payment methods. It includes custom components, modern styling, and automated tests.

## Link Prod: https://bold-test-git-main-9alex12s-projects.vercel.app/
## Main Structure

- **app/**: Global configuration (`globals.css`), main layout, and the main page (`page.tsx`).
- **components/**: Reusable components:
  - `MainTable`: Main transactions table.
  - `InformationCard`: Info card with totals.
  - `Filter`: Filter for payment type.
  - `SideModal`: Side modal with details.
  - `TableTabs`: Tabs for time range selection.
  - `icons/`: Custom SVG icons.
- **views/**: Main view (`Home.tsx`) that integrates components and manages filtering and navigation logic.
- **utils/**: Utility functions for formatting and constants.
- **__tests__/**: Unit tests for components using Jest and Testing Library.
- **public/**: Static files.

## Functionality

- Display transactions filtered by payment method and time range.
- Side modal with full details for each transaction.
- Interactive filters and tabs to change the time range.
- Modern styling with Tailwind CSS and custom fonts.
- Unit tests to ensure component quality.

## Installation and Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Scripts
- `npm run dev`: Start the development server.
- `npm run test`: Run unit tests.
- `npm run build`: Build the app for production.

## Testing
Tests are located in the `__tests__` folder and cover the main components. They are run using Jest and Testing Library.

## Configuration
- **Jest**: Configured for Next.js and TypeScript (`jest.config.ts`, `jest.setup.ts`).
- **ESLint**: Code quality rules (`.eslintrc.js`).
- **Tailwind/PostCSS**: Modern styling (`postcss.config.js`, `globals.css`).


