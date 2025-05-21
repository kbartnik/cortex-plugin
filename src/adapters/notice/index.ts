import { Notice } from 'obsidian';
import type { NoticeAdapter } from './interface';

/**
 * The default implementation of NoticeAdapter using Obsidian's Notice API.
 */
export const defaultNoticeAdapter: NoticeAdapter = {
    /**
     * Displays a notification to the user using Obsidian's built-in Notice system.
     *
     * @param message - The message to display.
     */
    notify: (message: string) => new Notice(message),
};