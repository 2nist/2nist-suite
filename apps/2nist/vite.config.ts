import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5175,
    strictPort: false,
    open: true
  },
  resolve: {
    alias: {
      '@2nist/ui-hooks': path.resolve(__dirname, '../../packages/ui-hooks'),
      '@2nist/ui': path.resolve(__dirname, '../../packages/ui'),
      '@2nist/utils': path.resolve(__dirname, '../../packages/utils'),
    },
  }
});
