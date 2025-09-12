import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // This tells Vite to listen on all network interfaces, which can help with some host-related issues.
    host: '0.0.0.0',
    // You can explicitly set the port here to avoid conflicts with other running applications.
    port: 3005,
  },
  base: './',
});
