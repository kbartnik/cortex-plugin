/**
 * Unit tests for createOrOpenTodayLog.
 *
 * Validates that:
 * - A new log file is created if one doesn't exist
 * - An existing log file is opened without duplication
 */


vi.mock("@/utils/notify", () => ({
    notify: vi.fn(),
}));

import {describe, it, expect, beforeEach, vi} from 'vitest';
import {createOrOpenTodayLog} from '@/services/logService';
import {App} from "../../src/types/obsidian";
import {getMockApp, resetMockVault} from '../mocks/app';
import {getTodayLogPath} from '@utils/date';
import {notify} from "@/utils/notify";

describe('createOrOpenTodayLog', () => {
    let app: App;

    beforeEach(() => {
        resetMockVault();
        app = getMockApp();
    });

    it("creates today's log if it does not exist", async () => {
        const expectedPath = getTodayLogPath(); // e.g., "daily/dev/2025-05-18.md"

        // Assert: file doesn't exist yet
        expect(app.vault.getAbstractFileByPath(expectedPath)).toBeNull();

        // Act
        await createOrOpenTodayLog(app);

        // Assert: file was created
        const newFile = app.vault.getAbstractFileByPath(expectedPath);
        expect(newFile).not.toBeNull();
        expect(newFile?.path).toBe(expectedPath);

        // Assert: file was opened
        const opened = (app.workspace.getLeaf() as any).openedFile;
        expect(opened?.path).toBe(expectedPath);
    });

    it("opens today's log if it already exists", async () => {
        const expectedPath = getTodayLogPath();

        // Arrange manually create the file in the mock vault
        const existingFile = await app.vault.create(expectedPath, "# Existing Log\nSome content");

        // Sanity check: file is created in the new vault
        expect(app.vault.getAbstractFileByPath(expectedPath)).toBe(existingFile);

        // Act
        await createOrOpenTodayLog(app);

        // Assert: file was not recreated
        const retrievedFile = app.vault.getAbstractFileByPath(expectedPath);
        expect(retrievedFile).toBe(existingFile);

        // Assert: the existing file was opened
        const leaf = app.workspace.getLeaf() as any;
        expect(leaf.openedFile).toBe(existingFile);
    });

    it("shows a notification if log creation fails", async () => {
        // Arrange: override create method to throw
        app.vault.create = vi.fn().mockRejectedValue(new Error("Simulated failure"));

        // Act
        await createOrOpenTodayLog(app);

        // Assert
        expect(notify).toHaveBeenCalledWith("Failed to create log: Simulated failure");
    });


});