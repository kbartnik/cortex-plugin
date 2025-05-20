/**
 * Utility functions for date formatting and path generation for developer log notes.
 */

/**
 * Returns the file path for today's developer log note, formatted as "daily/dev/YYYY-MM-DD.md".
 *
 * @returns The relative path to today's log note.
 */
export function getTodayLogPath(): string {
    return formatLogPath(new Date(), 'daily/dev', 'md')
}

/**
 * Formats a log file path from a given date, base directory, and file extension.
 *
 * @param date - The date to use for the log filename
 * @param baseDir - The base directory for logs (e.g. "daily/dev")
 * @param extension - The file extension to use (e.g. "md")
 * @returns The formatted relative path to the log file
 */
function formatLogPath(date: Date, baseDir: string, extension: string): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const fileName = `${year}-${month}-${day}.${extension}`;
    return `${baseDir}/${fileName}`;
}

