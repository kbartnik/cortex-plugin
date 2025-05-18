// tests/services/logService.test.ts
import {describe, it, expect, beforeEach} from 'vitest';
import {createOrOpenTodayLog} from '@/services/logService';
import {getMockApp, resetMockVault} from '../mocks/app';
import {getTodayLogPath} from '@utils/date';
import {App} from "obsidian";

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
});