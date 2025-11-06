# React + TypeScript + Vite + Tailwind CSS Setup Guide

## Prerequisites
- Node.js (version 16 or higher)
- pnpm or npm package manager

## Create a New Vite Project with React and TypeScript

Create a folder and name it
Open your terminal in the folder of the react project you have created and run:

```bash
pnpm create vite ./
select - React Framework 
select - Typescript
Use rolldown-vite (Experimental)?: No
Install with pnpm and start now? - Yes

Open VSCode - code .
```

This creates a new React TypeScript project using Vite's official template.

## Install Tailwind CSS and Its Dependencies

```bash
pnpm install tailwindcss @tailwindcss/vite
```

## Configure the Vite plugin

Add the @tailwindcss/vite plugin to your Vite configuration.

```bash
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(), // add this line
  ],
})
```

## Import Tailwind CSS in Index.css

```css
@import "tailwindcss";
```

## Clean Up the Default App Component (Optional)

Open `src/App.tsx` and replace it with a simple component to test Tailwind:

```tsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Hello, Tailwind CSS!
        </h1>
        <p className="text-gray-700">
          Your React + TypeScript + Vite + Tailwind setup is ready!
        </p>
      </div>
    </div>
  )
}

export default App
```

## Start the Development Server

```bash
pnpm run dev
```

The development server typically starts at `http://localhost:5173`

## Verify Your Setup

Open your browser and navigate to the local development URL. You should see your styled component with Tailwind CSS applied.

## Project Structure

Your project should now have this structure:

```
my-react-app/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Additional Commands

- **Build for production**: `pnpm run build` or `yarn build`
- **Preview production build**: `pnpm run preview` or `yarn preview`
- **Lint code**: `pnpm run lint` or `yarn lint`

## Tips

1. **VSCode Extension**: Install the "Tailwind CSS IntelliSense" extension for better autocomplete and linting
2. **TypeScript Configuration**: The `tsconfig.json` is pre-configured for React, but you can customize it as needed
3. **Hot Module Replacement**: Vite provides instant HMR, so changes appear immediately in the browser
4. **Tailwind Customization**: Extend your theme in `tailwind.config.js` to add custom colors, fonts, and more

## Troubleshooting

- **Styles not applying**: Make sure `src/index.css` is imported in `src/main.tsx`
- **TypeScript errors**: Check that all dependencies are properly installed
- **Port conflicts**: If port 5173 is in use, Vite will automatically use the next available port

You're now ready to build your React application with TypeScript, Vite, and Tailwind CSS!