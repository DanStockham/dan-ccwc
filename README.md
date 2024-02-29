
# CCWC CLI Application

CCWC is a command line application that counts the number of bytes, characters, words, and newlines in each given file, or standard input if none are given or for a file of ‘-`. A word is a nonzero length sequence of printable characters delimited by white space.

## Installation

To install the CCWC CLI application globally on your machine, you can use the following command:

```bash
npm install -g ccwc
```

If performing development, clone the repository and install from local files

```bash
npm install -g .
```

## Usage

```bash
wc [option]… [file]…
```

CCWC, similar to wc, provides a line of counts for each specified file, followed by the file name. If multiple files are specified, a final line with cumulative counts is printed by default, labeled as 'total'. This 'total' line can be manipulated with the --total option, a feature unique to GNU. The counts are displayed in the following order: newlines, words, characters, bytes, maximum line length. Each count is right-justified, with at least one space between fields, ensuring a neat column-like arrangement. The width of the count fields is dynamic based on the inputs, so reliance on a specific field width is discouraged. However, as a GNU extension, if only one count is printed, it is assured to be printed without leading spaces.

## Options

`-c`
`--bytes`

Print only the byte counts.

`-m`
`--chars`

Print only the character counts, as per the current locale. Invalid characters are not counted.

`-w`
`--words`

Print only the word counts. A word is a nonzero length sequence of printable characters separated by white space.

`-l`
`--lines`

Print only the newline character counts. Note a file without a trailing newline character, will not have that last portion included in the line count.

`-L`
`--max-line-length`
**NOT IMPLEMENTED**

Print only the maximum display widths. Tabs are set at every 8th column. Display widths of wide characters are considered. Non-printable characters are given 0 width.

`--total=when`
**NOT IMPLEMENTED**

Control when and how the final line with cumulative counts is printed. when is one of:

* auto - This is the default mode of wc when no --total option is specified. Output a total line if more than one file is specified.
always - Always output a total line, irrespective of the number of files processed.

* only - Only output total counts. I.e., don`t print individual file counts, suppress any leading spaces, and don`t print the `total` word itself, to simplify subsequent processing.

* never - Never output a total line. 

`--files0-from=file`
**NOT IMPLEMENTED**

Disallow processing files named on the command line, and instead process those named in file file; each name being terminated by a zero byte (ASCII NUL). This is useful when the list of file names is so long that it may exceed a command line length limitation. In such cases, running wc via xargs is undesirable because it splits the list into pieces and makes wc print a total for each sublist rather than for the entire list. One way to produce a list of ASCII NUL terminated file names is with GNU find, using its -print0 predicate. If file is ‘-` then the ASCII NUL terminated file names are read from standard input. 




