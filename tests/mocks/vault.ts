/**
 * Provides a mock implementation of the Obsidian Vault for use in unit tests.
 * Supports basic file creation and retrieval operations by path.
 *
 * This mock enables tests to simulate vault behavior without requiring the actual plugin runtime.
 */
import { Vault, TFile } from 'obsidian';

const mockFiles: Record<string, TFile> = {};

/**
 * Creates a mock Vault instance with support for `getAbstractFileByPath` and `create`.
 *
 * @param overrides - Optional overrides for specific Vault methods.
 * @returns A Vault-like object with default methods for test use.
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
 * Clears the mock file registry to reset state between test runs.
 */
export function resetMockVault() {
    for (const key in mockFiles) {
        delete mockFiles[key];
    }
}