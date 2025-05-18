/**
 * Service module responsible for managing developer log notes.
 * Includes functionality for creating or opening today's log entry.
 */

import {App, TFile} from "obsidian";
import {getTodayLogPath} from "@utils/date";

/**
 * Opens the developer log note for today, creating it if it doesn't already exist.
 *
 * @param app - The Obsidian App instance, used to access the vault and workspace.
 * @returns A promise that resolves once the note is opened or created and opened.
 */
export async function createOrOpenTodayLog(app: App) : Promise<void> {
    const path = getTodayLogPath();
    let file = await app.vault.create(path, '') as TFile | null;

    // If the file does not exist, create it
    if (!file) {
        file = await app.vault.create(path, '');
    }

    // Open the file using the active workspace leaf
    const leaf = app.workspace.getLeaf();
    await leaf.openFile(file);

    //
}