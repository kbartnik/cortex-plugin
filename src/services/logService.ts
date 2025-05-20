/**
 * Service module responsible for managing developer log notes.
 * Provides logic to create or open today's log entry and related helpers.
 */

import {getTodayLogPath} from "@utils/date";
import type { AppAdapter } from "@/adapters/app/interface";

/**
 * Opens the developer log note for today, creating it if it doesn't already exist.
 *
 * @param app - The application adapter that provides access to vault, workspace, and notification functionality.
 * @returns A promise that resolves once the note is opened or created and opened.
 */
export async function createOrOpenTodayLog(app: AppAdapter): Promise<void> {
    const path = getTodayLogPath();

    try {
        const file = await ensureLogFile(path, app.vault);
        await app.workspace.openFile(file);
    } catch (error) {
        app.notice.notify(`Failed to create log: ${(error as Error).message}`);
    }
}

async function ensureLogFile(path: string, vault: AppAdapter["vault"]): Promise<TFile> {
    const file = vault.getFile(path);
    return file ?? await vault.createFile(path, '');
}