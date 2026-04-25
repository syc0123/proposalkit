import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['__tests__/setup.ts'],
  },
  resolve: {
    alias: [
      // More specific aliases must come before the catch-all @/ alias
      { find: '@/auth', replacement: resolve(__dirname, '__mocks__/auth.ts') },
      { find: '@', replacement: resolve(__dirname, '.') },
    ],
  },
})
