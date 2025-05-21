/**
 * Provides a mock implementation of Obsidian's WorkspaceLeaf for use in unit tests.
 *
 * This mock leaf supports:
 * - Opening TFiles via `openFile`
 * - Tracking the last opened file via the `openedFile` property
 *
 * It enables assertions on which file was "opened" in tests without relying on Obsidian's runtime.
 */
import {TFile, WorkspaceLeaf} from "obsidian";

/**
 * Creates a mock WorkspaceLeaf that tracks the most recently opened TFile.
 *
 * @returns A mock WorkspaceLeaf with:
 *   - `openFile(file: TFile)`: async method that sets the opened file
 *   - `openedFile`: a getter for the last opened TFile (or null if none)
 */
export function createMockLeaf(): WorkspaceLeaf {
    // Internal reference to the last file passed to openFile
    let opened: TFile | null = null;

    return {
        /**
         * Mocks opening a file in the leaf. Records the file for later inspection.
         */
        openFile: async (file: TFile) => {
            opened = file
        },
        /**
         * Exposes the most recently opened file for inspection in tests
         */
        get openedFile() { return opened },
    } as any;
}