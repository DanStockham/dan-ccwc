
# CCWC CLI Application

CCWC is a command line application that counts the number of bytes, characters, words, and newlines in each given file, or standard input if none are given or for a file of ‘-`. A word is a nonzero length sequence of printable characters delimited by white space.

This project was inspired by one of the coding challenges from https://codingchallenges.fyi/

## Installation

If performing development, clone the repository and install from local files

```bash
npm install -g .
```

## Usage

```bash
dan-ccwc [option]… [file]…
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




