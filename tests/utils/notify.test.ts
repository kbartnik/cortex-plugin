/**
 * Unit test for the `notify` utility function.
 *
 * Ensures that notification messages are properly delegated
 * to the configured `defaultNoticeAdapter`.
 */
import { vi, describe, it, expect } from "vitest";
import { notify } from "@/utils/notify";
import { defaultNoticeAdapter } from "@/adapters/notice";

vi.mock('@/adapters/notice', () => ({
    defaultNoticeAdapter: { notify: vi.fn() },
}));

describe('notify', () => {
    it('delegates to the defaultNoticeAdapter', () => {
        notify('test message');

        expect(defaultNoticeAdapter.notify).toHaveBeenCalledWith('test message');
    })
})