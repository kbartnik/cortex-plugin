import type {VaultFile} from '@/adapters/vault/interface';

export interface WorkspaceAdapter{
    openFile(file: VaultFile): Promise<void>;
}