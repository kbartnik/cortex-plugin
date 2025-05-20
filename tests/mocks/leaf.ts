/**
 * Provides a mock implementation of Obsidian's WorkspaceLeaf for use in unit tests.
 */
import {TFile, WorkspaceLeaf} from "obsidian";

/**
 * Creates a mock WorkspaceLeaf that tracks the most recently opened TFile.
 * Intended for use in tests that assert file opening behavior.
 *
 * @returns A mock WorkspaceLeaf instance with openFile and openedFile
 */
export function createMockLeaf(): WorkspaceLeaf {
    let opened: TFile | null = null;

    return {
        openFile: async (file: TFile) => {
            opened = file
        },
        get openedFile() { return opened },
    } as any;
}