import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/Core'),
      '@modules': path.resolve(__dirname, './src/Modules'),
      '@app': path.resolve(__dirname, './src/App.tsx'), // New alias for App.tsx
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
