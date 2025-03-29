import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@2nist/ui-hooks': path.resolve(__dirname, '../../packages/ui-hooks'),
      '@2nist/ui': path.resolve(__dirname, '../../packages/ui'),
      '@2nist/utils': path.resolve(__dirname, '../../packages/utils')
    }
  }
})