import type {TFile} from 'obsidian';

/**
 * A simplified representation of a file in the Obsidian vault.
 * This abstraction avoids direct dependency on Obsidian's TFile type.
 */
export interface VaultFile {
    /** The full path to the file in the vault. */
    path: string;
    /** The name of the file (excluding path). */
    name: string;
}

/**
 * Provides access to file operations in the Obsidian vault, abstracted away from the Obsidian API.
 */
export interface VaultAdapter {
    /**
     * Retrieves a file from the vault by its path.
     *
     * @param path - The full path to the desired file.
     * @returns A VaultFile if found, otherwise null.
     */
    getFile(path: string): VaultFile | null;

    /**
     * Creates a new file at the specified path with the given content.
     *
     * @param path - The full path where the new file should be created.
     * @param content - The contents to initialize the file with.
     * @returns A promise resolving to the created VaultFile.
     */
    createFile(path: string, content: string): Promise<VaultFile>;
}