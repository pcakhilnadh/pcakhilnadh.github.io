import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Debug function to log configuration
function logConfig(config) {
  console.log("Vite configuration:", JSON.stringify(config, null, 2));
  return config;
}

export default defineConfig(async ({ command, mode }) => {
  // Log build information
  console.log(`Building for ${mode} mode with command ${command}`);
  
  // Conditionally import the cartographer plugin
  let cartographerPlugin = [];
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const cartographer = await import("@replit/vite-plugin-cartographer");
    cartographerPlugin = [cartographer.cartographer()];
  }
  
  const config = {
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...cartographerPlugin,
    ],
    base: '/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
      sourcemap: true,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]'
        }
      }
    },
    server: {
      port: 5000,
      middlewares: [
        (req, res, next) => {
          console.log(`${req.method} ${req.url}`);
          next();
        }
      ]
    },
    // Add this section to improve asset handling
    optimizeDeps: {
      include: ['react', 'react-dom', 'wouter'],
      exclude: []
    },
    // Improve CSS handling
    css: {
      devSourcemap: true,
    },
    // Add more detailed logging for troubleshooting
    logLevel: 'info',
    clearScreen: false
  };
  
  // For GitHub Pages deployment, ensure the base path is correct
  if (mode === 'production') {
    console.log('Setting up for production/GitHub Pages deployment');
    // Make sure this matches your GitHub repository name
    config.base = '/akhilnadhpc/';
  }
  
  return logConfig(config);
});

