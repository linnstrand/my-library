<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Project Overview

This project is a React application created with Vite, using TypeScript and Tailwind CSS. It is designed for fast development and type-safe, utility-first styling.

## Key Files and Directories

- `src/`: Contains the main application code.
  - `App.tsx`: The root component of the application. Manages state for view, grouping, sorting, and selected book.
  - `components/`: Contains reusable components:
    - `Header.tsx`: Provides controls for changing view, grouping, and sorting.
    - `MainView.tsx`: Displays the collection of books in grid or list format.
    - `Sidebar.tsx`: Shows details of the selected book.
  - `index.css`: Includes Tailwind CSS directives and global styles.
- `tailwind.config.js`: Configuration for Tailwind CSS.
- `vite.config.ts`: Configuration for Vite.
- `package.json`: Scripts and dependencies.

## Developer Workflows

### Start Development Server

Run the following command to start the development server:

```sh
npm run dev
```

### Build for Production

To build the application for production, use:

```sh
npm run build
```

### Linting

Ensure code quality by running:

```sh
npm run lint
```

## Project-Specific Conventions

- **Styling**: Use Tailwind CSS for all styling. Add custom styles in `index.css` if necessary.
- **TypeScript**: Follow strict type-checking rules as configured in `tsconfig.app.json`.
- **Component Structure**: Keep components modular and reusable. Place assets in `src/assets/`.
- **State Management**: Use React's `useState` for local state management. Example: `App.tsx` manages state for view, grouping, sorting, and selected book.

## Integration Points

- **React**: React 18 is used for building UI components.
- **Vite**: Vite is used for fast development and build processes.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Examples

### Adding a New Component

1. Create a new file in `src/components/` (e.g., `MyComponent.tsx`).
2. Import and use Tailwind classes for styling.
3. Export the component and use it in `App.tsx` or other components.

### Updating Tailwind Configuration

Modify `tailwind.config.js` to extend the theme or add plugins.

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
