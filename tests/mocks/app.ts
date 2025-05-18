/**
 * Mock implementation of the Obsidian `App` interface for use in unit tests.
 * This provides an in-memory mock vault and workspace behavior.
 */
// tests/mocks/app.ts
import { TFile, Vault, WorkspaceLeaf, App } from 'obsidian'

let mockVaultFiles: Record<string, TFile> = {}
let openedFile: TFile | null = null

/**
 * Clears all mock vault state.
 * Should be called before each test to ensure isolation.
 */
export function resetMockVault() {
    mockVaultFiles = {}
    openedFile = null
}

/**
 * Creates a mock Obsidian App object with minimal vault and workspace behavior
 * for testing purposes. Simulates file creation, retrieval, and workspace file opening.
 *
 * @returns {App} A mock App instance suitable for unit tests
 */
export function getMockApp(): App {
    // Simulated vault object
    const vault: Partial<Vault> = {
        // Simulates retrieving a file by path
        getAbstractFileByPath: (path: string) => mockVaultFiles[path] ?? null,

        // Simulates creating a file and storing it in memory
        create: async (path: string, content: string): Promise<TFile> => {
            // Create a mock TFile object
            const file: TFile = {
                path,
                name: path.split('/').pop()!, // Get filename from path
                extension: 'md',
                stat: {ctime: 0, mtime: 0, size: content.length},
                vault: {} as Vault,
                parent: null as any,
                basename: '' // Can optionally set basename here
            }
            // Store the file in the mock vault
            mockVaultFiles[path] = file
            return file
        },
    }

    // Simulated workspace object with a test-friendly leaf
    const workspace: Partial<App['workspace']> = {
        getLeaf(): WorkspaceLeaf {
            return {
                // Simulates opening a file in a pane
                openFile: async (file: TFile) => {
                    openedFile = file
                },
                // Custom helper to retrieve last opened file for assertions
                get openedFile(): TFile | null {
                    return openedFile
                },
            } as any
        },
    }

    // Return a mock App composed of the simulated vault and workspace
    return {
        vault: vault as Vault,
        workspace: workspace as App['workspace'],
    } as App
}