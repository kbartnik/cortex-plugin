import type {AppAdapter} from './interface';
import type {VaultFile} from '../vault/interface';
import {App, TFile} from "obsidian";
import {createVaultAdapter} from "../vault";
import {createWorkspaceAdapter} from "../workspace";
import {defaultNoticeAdapter} from "../notice";

export function createAppAdapter(app: App): AppAdapter {
    const resolveTFile = (file: VaultFile) =>
        app.vault.getAbstractFileByPath(file.path) as TFile | null;

    return {
        vault: createVaultAdapter(app.vault),
        workspace: createWorkspaceAdapter(app.workspace, resolveTFile),
        notice: defaultNoticeAdapter,
    };
}