/**
 * Prints to stdout if in debug mode
 */
declare function print(...text: string[]): void;

/**
 * Prints to internal console and to mainlog.html
 */
declare function log(text: string): void;

/**
 * Prints to internal console, mainlog.html and interestinglog.html
 * Prefixed with "WARNING:"
 */
declare function warn(text: string): void;

/**
 * Prints to internal console, mainlog.html and interestinglog.html
 * Prefixed with "ERROR:"
 */
declare function error(text: string): void;
