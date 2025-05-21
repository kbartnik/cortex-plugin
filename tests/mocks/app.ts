/**
 * Provides a mock implementation of the Obsidian `App` interface for use in unit tests.
 *
 * This mock supports:
 * - In-memory vault behavior (file creation and lookup)
 * - Workspace behavior with `getLeaf()` for tracking file openings
 *
 * It is intended for use in unit tests where real Obsidian behavior must be simulated without plugin runtime.
 */
// tests/mocks/app.ts
import {TFile, WorkspaceLeaf, App} from 'obsidian'
import {createMockVault, resetMockVault as resetVaultFiles} from "./vault";

// Tracks the most recently opened file in the mock workspace.
let openedFile: TFile | null = null;

// Exposes the reset function for clearing the mock vault state between tests.
export const resetMockVault = resetVaultFiles;

/**
 * Constructs a mock Obsidian App object for use in unit tests.
 *
 * This mock includes:
 * - A vault implementation from `createMockVault`
 * - A workspace with a `getLeaf()` function that returns an object implementing `openFile()`
 *   which sets the `openedFile` reference, allowing tests to inspect what was "opened"
 *
 * @returns A partial App object simulating the vault and workspace APIs.
 */
export function getMockApp(): App {
    const vault = createMockVault();

    const workspace: Partial<App['workspace']> = {
        getLeaf: () =>
            ({
                openFile: async (file: TFile) => {
                    openedFile = file;
                },
                get openedFile() {
                    return openedFile;
                },
            } as unknown as WorkspaceLeaf),
    };

    return {
        vault,
        workspace,
    } as App;
}