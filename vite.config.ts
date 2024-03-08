/// <reference types="vitest" />
import { defineConfig } from 'vite'
import umdFormatResolver from 'vite-plugin-resolve-umd-format'

export default defineConfig({
  plugins: [umdFormatResolver()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'stopmarkdown',
      formats: ['es', 'cjs', 'umd'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['stophtml'],
      output: {
        globals: { stophtml: 'stophtml' }
      }
    }
  },
  test: {
    globals: true,
    include: ['test/*.test.ts']
  }
})
