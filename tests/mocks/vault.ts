/**
 * Provides a mock implementation of the Obsidian Vault for use in unit tests.
 * Supports basic file creation and retrieval operations.
 */
import { Vault, TFile } from 'obsidian';

const mockFiles: Record<string, TFile> = {};

/**
 * Creates a mock Vault instance for testing.
 * Allows optional method overrides via the `overrides` parameter.
 *
 * @param overrides - Partial Vault methods to override default mock behavior
 * @returns A Vault-like object supporting file creation and lookup
 */
export function createMockVault(overrides: Partial<Vault> = {}): Vault {
    return {
        getAbstractFileByPath: (path: string) => mockFiles[path] ?? null,

        create: async (path: string, content: string) => {
            const file: TFile = {
                path,
                name: path.split('/').pop()!,
                extension: 'md',
                stat: { ctime: 0, mtime: 0, size: content.length },
                vault: {} as Vault,
                parent: null as any,
                basename: path.split('/').pop()!.replace(/\.md$/, '')
            };
            mockFiles[path] = file;
            return file;
        },

        ...overrides
    } as Vault;
}

/**
 * Resets the internal mock file registry to ensure test isolation.
 */
export function resetMockVault() {
    for (const key in mockFiles) {
        delete mockFiles[key];
    }
}