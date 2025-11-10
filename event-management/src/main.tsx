import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          classNames: {
            error: "bg-red-500 text-white",
            success: "bg-green-500 text-white",
            warning: "bg-yellow-500 text-white",
            info: "bg-blue-500 text-white",
          },
        }}
      />
    </ErrorBoundary>
  </StrictMode>,
)
