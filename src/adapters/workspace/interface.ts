import type { VaultFile } from '@/adapters/vault/interface';

/**
 * Provides access to workspace-level operations, such as opening files in the editor.
 */
export interface WorkspaceAdapter {
    /**
     * Opens a given VaultFile in the active workspace leaf.
     *
     * @param file - The VaultFile to open.
     * @returns A promise that resolves once the file is opened.
     */
    openFile(file: VaultFile): Promise<void>;
}