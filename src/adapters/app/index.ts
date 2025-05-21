import type {AppAdapter} from './interface';
import type {VaultFile} from '../vault/interface';
import {App, TFile} from "obsidian";
import {createVaultAdapter} from "../vault";
import {createWorkspaceAdapter} from "../workspace";
import {defaultNoticeAdapter} from "../notice";


/**
 * Constructs an AppAdapter by wiring together vault, workspace, and notice adapters
 * using the provided Obsidian App instance.
 *
 * This factory function encapsulates all Obsidian-specific logic and returns
 * an AppAdapter interface to abstract away direct API usage.
 *
 * @param app - The Obsidian App instance provided by the plugin runtime.
 * @returns A fully-wired AppAdapter composed of vault, workspace, and notice functionality.
 */
export function createAppAdapter(app: App): AppAdapter {
    const resolveTFile = (file: VaultFile) =>
        app.vault.getAbstractFileByPath(file.path) as TFile | null;

    return {
        vault: createVaultAdapter(app.vault),
        workspace: createWorkspaceAdapter(app.workspace, resolveTFile),
        notice: defaultNoticeAdapter,
    };
}