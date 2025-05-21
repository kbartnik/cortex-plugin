import type {Vault} from 'obsidian';
import {VaultAdapter} from "@adapters/vault/interface";

/**
 * Creates an adapter that wraps Obsidian's Vault API, exposing only the necessary functionality
 * through the VaultAdapter interface. This keeps plugin logic decoupled from Obsidian internals.
 *
 * @param vault - The Obsidian Vault instance provided by the plugin environment.
 * @returns A VaultAdapter that provides file access and creation methods.
 */
export function createVaultAdapter(vault: Vault): VaultAdapter {
    return {
        /**
         * Retrieves a file from the vault by its path, returning a simplified VaultFile.
         *
         * @param path - The full path to the file.
         * @returns A VaultFile object if found, otherwise null.
         */
        getFile: (path: string) => {
            const file = vault.getAbstractFileByPath(path);
            if (file && file instanceof (window as any).TFile) {
                return {path: file.path, name: file.name};
            }
            return null;
        },

        /**
         * Creates a new file in the vault and returns a simplified VaultFile representation.
         *
         * @param path - The full path where the file should be created.
         * @param content - The initial content of the file.
         * @returns A promise resolving to the created VaultFile.
         */
        createFile: async (path: string, content: string) => {
            const file = await vault.create(path, content);
            return {path: file.path, name: file.name};
        },
    };
}