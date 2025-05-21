import {defaultNoticeAdapter} from "@adapters/notice";

/**
 * Sends a user-facing notification using the default notice adapter.
 *
 * @param message - The message to be displayed in the notification popup.
 */
export function notify(message: string): void {
    defaultNoticeAdapter.notify(message);
}