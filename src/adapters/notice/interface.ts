/**
 * Provides user-facing notifications, abstracting away the underlying implementation (e.g., Obsidian's Notice).
 */
export interface NoticeAdapter {
    notify(message: string): void;
}