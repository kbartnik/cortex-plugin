import type { Workspace, TFile } from 'obsidian';
import type { WorkspaceAdapter } from './interface';
import type { VaultFile } from '@/adapters/vault/interface';

/**
 * Creates an adapter for the Obsidian workspace that allows opening files through an abstract VaultFile interface.
 *
 * @param workspace - The Obsidian Workspace instance.
 * @param resolveTFile - A function that resolves a VaultFile back into a real TFile.
 * @returns A WorkspaceAdapter implementation.
 */
export function createWorkspaceAdapter(
  workspace: Workspace,
  resolveTFile: (file: VaultFile) => TFile | null
): WorkspaceAdapter {
  /**
   * Converts a VaultFile into an actual TFile using the provided resolution function.
   *
   * @param file - The VaultFile to resolve.
   * @returns The corresponding TFile if found.
   * @throws If the file cannot be resolved.
   */
  function toTFile(file: VaultFile): TFile {
    const real = resolveTFile(file);
    if (!real) throw new Error(`Could not resolve VaultFile: ${file.path}`);
    return real;
  }

  return {
    /**
     * Opens a file in the workspace using the Obsidian view system.
     *
     * @param file - The VaultFile to open.
     */
    openFile: async (file: VaultFile) => {
      const realFile = toTFile(file);
      await workspace.getLeaf().openFile(realFile);
    },
  };
}