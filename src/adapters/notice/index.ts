import { Notice } from 'obsidian';
import type { NoticeAdapter } from './interface';

/**
 * The default implementation of NoticeAdapter using Obsidian's Notice API.
 */
export const defaultNoticeAdapter: NoticeAdapter = {
    notify: (message: string) => new Notice(message),
};