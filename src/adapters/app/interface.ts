import type { VaultAdapter } from '../vault/interface';
import type { WorkspaceAdapter} from '../workspace/interface';
import type { NoticeAdapter } from '../notice/interface';

/**
 * An abstraction layer that unifies core plugin services into a single adapter interface.
 *
 * This allows the rest of the plugin to operate independently of the Obsidian API,
 * making the system more testable and modular. Each field represents a distinct subsystem:
 *
 * - `vault`: File system access
 * - `workspace`: Editor/view management
 * - `notice`: User notification and feedback
 */
export interface AppAdapter {
    vault: VaultAdapter;
    workspace: WorkspaceAdapter;
    notice: NoticeAdapter;
}