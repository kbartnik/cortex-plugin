/****
 * Vite configuration for building the Obsidian Cortex plugin.
 * Outputs a CommonJS-compatible `main.js` bundle in `dist/` for Obsidian to load.
 */
import { defineConfig } from 'vite';

export default defineConfig({
  /**
   * Build configuration to output a CommonJS library compatible with Obsidian.
   */
  build: {
    /**
     * Library mode config: defines the plugin entry point and output format.
     */
    lib: {
      // Path to the plugin's main TypeScript entry file.
      entry: 'src/main.ts',
      // Format must be 'cjs' (CommonJS) because Obsidian does not support ESM.
      formats: ['cjs'],
      // Output file will always be named main.js.
      fileName: () => 'main.js',
    },
    // Output directory for compiled plugin files.
    outDir: 'dist',
    // Clean the output directory before building.
    emptyOutDir: true,
    /**
     * Rollup options for externalizing Obsidian dependency.
     */
    rollupOptions: {
      // Prevent 'obsidian' from being bundled — it will be provided by the app at runtime.
      external: ['obsidian'],
    },
  },
});