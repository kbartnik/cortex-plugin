/****
 * Cortex Plugin
 * Obsidian plugin that provides developer-focused executive function tools.
 * This is the entry point loaded by Obsidian.
 */

/**
 * Main plugin class registered by Obsidian.
 * Handles lifecycle hooks like onload and onunload.
 */
export default class CortexPlugin extends Plugin {
    /**
     * Called by Obsidian when the plugin is loaded.
     * Initialize commands, settings, and UI elements here.
     */
    async onload() {
        console.log('CortexPlugin loaded');
    }

    /**
     * Called by Obsidian when the plugin is unloaded.
     * Clean up any resources or UI elements registered in onload.
     */
    async onunload() {
        console.log('CortexPlugin unloaded');
    }
}