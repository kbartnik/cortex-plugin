/**
 * Service module responsible for managing developer log notes.
 * Provides logic to create or open today's log entry and related helpers.
 */

import {getTodayLogPath} from "@utils/date";
import type { AppAdapter } from "@/adapters/app/interface";
import type { VaultFile } from "@/adapters/vault/interface";

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

/**
 * Ensures that a log file exists at the given path. If the file does not exist,
 * it will be created with empty content.
 *
 * @param path - The full path to the log file.
 * @param vault - The vault adapter used to interact with the file system.
 * @returns A promise resolving to the existing or newly created VaultFile.
 */
async function ensureLogFile(path: string, vault: AppAdapter["vault"]): Promise<VaultFile> {
    const file = vault.getFile(path);
    return file ?? await vault.createFile(path, '');
}