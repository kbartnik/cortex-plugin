import type { TFile, Vault} from 'obsidian';
import {VaultAdapter} from "@adapters/vault/interface";

export function createVaultAdapter(vault: Vault): VaultAdapter {
    return {
        getFile: (path: string) => {
            const file = vault.getAbstractFileByPath(path);
            if (file && file instanceof (window as any).TFile) {
                return { path: file.path, name: file.name };
            }
            return null;
        },
        createFile: async (path: string, content: string) => {
            const file = await vault.create(path, content);
            return { path: file.path, name: file.name };
        },
    };
}