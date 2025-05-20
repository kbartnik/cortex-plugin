/**
 * Mock implementation of the Obsidian `App` interface for use in unit tests.
 * This provides an in-memory mock vault and workspace behavior.
 */
// tests/mocks/app.ts
import {TFile, WorkspaceLeaf, App} from 'obsidian'
import {createMockVault, resetMockVault as resetVaultFiles} from "./vault";

let openedFile: TFile | null = null

export const resetMockVault = resetVaultFiles;

/**
 * Constructs a mock Obsidian App object for use in unit tests.
 * This mock includes:
 * - A vault implementation from `createMockVault`, supporting file creation and lookup
 * - A workspace implementation with a `getLeaf()` method that tracks the most recently opened file
 *
 * @returns A partially mocked App instance simulating essential vault and workspace behaviors
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