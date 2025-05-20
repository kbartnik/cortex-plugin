import type { VaultAdapter } from '../vault/interface';
import type { WorkspaceAdapter} from '../workspace/interface';
import type { NoticeAdapter } from '../notice/interface';

export interface AppAdapter {
    vault: VaultAdapter;
    workspace: WorkspaceAdapter;
    notice: NoticeAdapter;
}