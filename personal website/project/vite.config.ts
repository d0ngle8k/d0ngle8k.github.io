import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Changed from '/My-portfolio-website/' to '/' for d0ngle8k.github.io
  server: {
    port: 5173,
    open: true, // Automatically open browser
    host: true, // Listen on all addresses
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['lucide-react'],
  },
});
