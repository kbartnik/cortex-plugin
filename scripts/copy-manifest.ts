/**
 * Copies the Obsidian plugin manifest file to the build output directory.
 * Formats output using Vite-style console messages.
 * Intended for use in build scripts.
 */
import {cpSync, statSync} from 'fs';
import {resolve} from 'path';
import {bold, green, dim, createColors} from 'colorette';

const {cyan} = createColors({useColor: true});

/** Source path of the manifest file to copy. */
const from = resolve('manifest.json');
/** Destination path in the `dist/` output directory. */
const to = resolve('dist/manifest.json');

/** Start timing the copy process. */
const start = Date.now();
/** Perform the file copy and capture file size and duration. */
cpSync(from, to, {force: true});
const size = statSync(to).size;
const prettySize = (size / 1024).toFixed(2) + ' kB';
const duration = Date.now() - start;

/** Extract filename and containing directory for output formatting. */
const relativePath = to.replace(process.cwd() + '/', '');
const fileName = relativePath.split('/').pop();
const fileDir = relativePath.replace(`/${fileName}`, '');

/**
 * Print Vite-style summary of the copied file including:
 * - Status header
 * - File path and size
 * - Duration
 */
console.log(`${green('✓')} ${'manifest file copied.'} ${dim('[copy-manifest]')}`);
console.log(`${dim(fileDir + '/')}${cyan(bold(fileName!))}  ${dim(prettySize)}`);
console.log(green(`✓ copied in ${duration}ms`));