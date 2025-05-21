export interface NoticeAdapter {
    /**
     * Sends a notification message to the user.
     *
     * @param message - The string content to display in the notification.
     */
    notify(message: string): void;
}