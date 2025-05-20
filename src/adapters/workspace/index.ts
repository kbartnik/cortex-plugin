import type { Workspace, TFile } from 'obsidian';
import type { WorkspaceAdapter } from './interface';
import type { VaultFile } from '@/adapters/vault/interface';

export function createWorkspaceAdapter(
  workspace: Workspace,
  resolveTFile: (file: VaultFile) => TFile | null
): WorkspaceAdapter {
  function toTFile(file: VaultFile): TFile {
    const real = resolveTFile(file);
    if (!real) throw new Error(`Could not resolve VaultFile: ${file.path}`);
    return real;
  }

  return {
    openFile: async (file: VaultFile) => {
      const realFile = toTFile(file);
      await workspace.getLeaf().openFile(realFile);
    },
  };
}