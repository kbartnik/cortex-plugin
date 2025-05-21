/**
 * Unit tests for the `createOrOpenTodayLog` service.
 *
 * These tests verify the plugin's behavior when:
 * - Creating a new log file
 * - Opening an existing one
 * - Handling failures during file creation
 *
 * The test suite mocks the AppAdapter, vault behavior, and notification system
 * to ensure the logic is isolated and deterministic.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createOrOpenTodayLog } from '@/services/logService';
import type { AppAdapter } from '@/adapters/app/interface';
import type { VaultFile } from '@/adapters/vault/interface';

// Mocks the notify adapter module
vi.mock("@/utils/notify", () => ({
    notify: vi.fn(),
}));

// Mocks the getTodayLogPath function
vi.mock("@/utils/date", () => ({
    getTodayLogPath: vi.fn(() => "daily/dev/2025-05-18.md"),
}));

import { notify } from "@/utils/notify";

describe('createOrOpenTodayLog', () => {
    let app: AppAdapter;
    let mockVault: Record<string, VaultFile>;
    let openedFile: VaultFile | null;

    /**
     * Sets up the mock AppAdapter with:
     * - A mock vault that stores and returns VaultFile objects by path
     * - A mock workspace that tracks the most recently opened file
     * - A mock notification handler that delegates to a test spy
     */
    beforeEach(() => {
        mockVault = {};
        openedFile = null;

        app = {
            vault: {
                getFile: (path) => mockVault[path] || null,
                createFile: vi.fn().mockImplementation(async (path: string, content: string) => {
                    const file: VaultFile = { path, name: path.split('/').pop() || path };
                    mockVault[path] = file;
                    return file;
                }),
            },
            workspace: {
                openFile: vi.fn().mockImplementation(async (file) => {
                    openedFile = file;
                }),
            },
            notice: {
                notify: notify,
            },
        };
    });

    it("creates today's log if it does not exist", async () => {
        const expectedPath = "daily/dev/2025-05-18.md"; // You may want to use a stubbed getTodayLogPath

        expect(app.vault.getFile(expectedPath)).toBeNull();

        await createOrOpenTodayLog(app);

        const newFile = app.vault.getFile(expectedPath);
        expect(newFile).not.toBeNull();
        expect(newFile?.path).toBe(expectedPath);

        expect(openedFile?.path).toBe(expectedPath);
    });

    it("opens today's log if it already exists", async () => {
        const expectedPath = "daily/dev/2025-05-18.md";
        const existingFile: VaultFile = { path: expectedPath, name: "2025-05-18.md" };
        mockVault[expectedPath] = existingFile;

        await createOrOpenTodayLog(app);

        expect(app.vault.getFile(expectedPath)).toBe(existingFile);
        expect(openedFile).toBe(existingFile);
    });

    it("shows a notification if log creation fails", async () => {
        const expectedPath = "daily/dev/2025-05-18.md";

        app.vault.createFile = vi.fn().mockRejectedValue(new Error("Simulated failure"));

        await createOrOpenTodayLog(app);

        expect(notify).toHaveBeenCalledWith("Failed to create log: Simulated failure");
    });
});