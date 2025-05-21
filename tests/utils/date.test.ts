/**
 * Unit tests for the `getTodayLogPath` utility function.
 *
 * Verifies that the correct log path is generated based on fixed dates,
 * including validation of zero-padded months and days.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { getTodayLogPath } from "@/utils/date";

describe("getTodayLogPath", () => {
    it("returns the correct path for a fixed date", () => {
        const fixedDate = new Date("2025-05-19T12:00:00Z");
        vi.setSystemTime(fixedDate);

        expect(getTodayLogPath()).toBe("daily/dev/2025-05-19.md");
    });

    it("pads single-digit months and days", () => {
        const fixedDate = new Date(2025, 0, 9);
        vi.setSystemTime(fixedDate);

        expect(getTodayLogPath()).toBe("daily/dev/2025-01-09.md");
    });

    // Reset system time mocks after each test to avoid side effects in other test suites.
    afterEach(() => {
        vi.useRealTimers();
    });
});