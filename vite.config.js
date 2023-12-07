/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      assets: '/src/assets',
      pages: '/src/pages',
      services: '/src/domain/services',
      models: '/src/domain/models',
      custom_hooks: '/src/custom_hooks',
      mocks: '/src/domain/mocks',
      utils: '/src/utils',
      errors: '/src/domain/errors',
      hooks: '/src/hooks',
      domain: '/src/domain'
    },
  },
  test: {
    globals: true,
    setupFiles: ['./setupTests.js'], // es importante definirlo en un archivo aparte para que se ejecute en otro contexto
    environment: 'jsdom',
    // @ts-ignore
    coverage: {
      reporter: ['text', 'json', 'html', 'json-summary'],
    },
  },
})
