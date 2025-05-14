import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "./components/ThemeProvider";
import App from "./App";
import "./index.css";

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  console.error('Error message:', event.message);
  console.error('Error source:', event.filename, 'line:', event.lineno, 'col:', event.colno);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Debug point: Log environment variables and base path
console.log("Environment variables:", {
  BASE_URL: import.meta.env.BASE_URL,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD
});

// Handle GitHub Pages SPA routing
const handleGitHubPagesRouting = () => {
  // If we're on GitHub Pages and not at the root
  if (import.meta.env.PROD && window.location.pathname.startsWith('/akhilnadhpc/') && 
      window.location.pathname !== '/akhilnadhpc/' && 
      !window.location.pathname.includes('.')) {
    
    console.log("Handling GitHub Pages SPA routing");
    // Redirect to the base with a hash route
    window.location.href = '/akhilnadhpc/#' + window.location.pathname.replace('/akhilnadhpc/', '');
    return true;
  }
  return false;
};

// Only proceed with rendering if we're not redirecting
if (!handleGitHubPagesRouting()) {
  // Debug point: Check if root element exists
  const rootElement = document.getElementById("root");
  console.log("Root element found:", !!rootElement);

  if (rootElement) {
    createRoot(rootElement).render(
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    );
  } else {
    console.error("Root element not found! Check your HTML structure.");
  }
}

