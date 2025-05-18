/**
 * Utility functions for date formatting and path generation for developer log notes.
 */

/**
 * Returns the file path for today's developer log note, formatted as "daily/dev/YYYY-MM-DD.md".
 *
 * @returns The relative path to today's log note.
 */
export function getTodayLogPath(): string {
    // Create a new Date object representing the current date and time
    const today = new Date()

    // Extract date components and zero-pad if necessary
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0')

    // Construct the filename using ISO format
    const fileName = `${year}-${month}-${day}.md`

    // Combine with folder path for dev logs
    return `daily/dev/${fileName}`
}