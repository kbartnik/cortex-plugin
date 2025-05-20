import type {TFile} from 'obsidian';

export interface VaultFile {
    path: string;
    name: string;
}

export interface VaultAdapter {
    getFile(path: string): VaultFile | null;
    createFile(path: string, content: string): Promise<VaultFile>;
}