/**
 * Vite configuration file for the Cortex plugin.
 *
 * This configuration supports:
 * - Plugin bundling with Vite and Rollup
 * - Module resolution aliases for cleaner imports
 * - Vitest integration for testing with coverage
 *
 * Aliases match the TypeScript paths defined in tsconfig.json.
 * Obsidian-specific bundling is handled via CommonJS output.
 */
import * as path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@commands': path.resolve(__dirname, 'src/commands'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@adapters': path.resolve(__dirname, 'src/adapters'),
      '@types': path.resolve(__dirname, 'src/types'),
    },
  },

  // ---- Build config for Obsidian plugin ----
  build: {
    outDir: 'dist',              // Output directory for the built plugin
    target: 'esnext',            // Modern JS target (since Obsidian uses modern Electron)
    minify: false,               // Disable minification for easier debugging
    sourcemap: true,             // Enable source maps for debugging

    lib: {
      entry: './src/main.ts',    // Entry point of the plugin
      formats: ['cjs'],          // Obsidian requires CommonJS format
    },

    rollupOptions: {
      external: ['obsidian'],    // Mark 'obsidian' as external to avoid bundling
      output: {
        entryFileNames: 'main.js', // Ensure output file is named `main.js` (required by Obsidian)
      },
    },
  },

  // ---- Test config for Vitest ----
  test: {
    include: ['tests/**/*.test.ts'], // Look for test files under tests/ with .test.ts suffix
    globals: false,                  // Allow using `describe`, `it`, etc. without importing
    environment: 'happy-dom',        // Simulates DOM environment (needed for Obsidian plugin APIs)
    coverage: {
      provider: "v8",                 // or 'c8' if you prefer c8 under the hood
      reporter: ['text', 'html'],     // 'text' for CLI, 'html' for browsable report
      reportsDirectory: "./coverage"  // optional: customize output location
    }
  },
})