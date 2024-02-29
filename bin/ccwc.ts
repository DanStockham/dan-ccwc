#!/usr/bin/env node

import yargs from 'yargs'
import fs from 'fs';
import util from 'util';
import { execSync } from 'child_process';

interface Arguments {
  [x: string]: unknown;
  _: (string | number)[] | undefined;
  c: boolean | undefined;
}

interface Output {
  byteCount: number;
  fileName: string | undefined;
  lineCount: number | undefined;
  wordCount: number | undefined;
  charCount: number | undefined;
}

let locale = 'en_US';
let multiByteSupport = true;

const multibyteSupportList = ['UTF-8', 'UTF-16', 'UTF-32', 'GB18030', 'Big5', 'Shift_JIS', 'EUC-KR', 'ISO-2022-JP', 'ISO-2022-KR', 'ISO-8859-1', 'ISO-8859-2', 'ISO-8859-3', 'ISO-8859-4', 'ISO-8859-5', 'ISO-8859-6', 'ISO-8859-7', 'ISO-8859-8', 'ISO-8859-9', 'ISO-8859-10', 'ISO-8859-11', 'ISO-8859-13', 'ISO-8859-14', 'ISO-8859-15', 'ISO-8859-16', 'KOI8-R', 'KOI8-U', 'KOI8-T', 'KOI8-E', 'KOI8-F'];

try {
  if (process.platform === 'win32') {
    // Windows
    const output = execSync('systeminfo').toString();
    const match = output.match(/System Locale:             (.*)\r?\n/);
    if (match) {
      locale = match[1].split(';')[0];
    }
  } else {
    // Unix-based (Linux, macOS, etc.)
    locale = execSync('echo $LANG').toString().trim();
  }
  const encoding = locale.split('.')[1];
  multiByteSupport = multibyteSupportList.includes(encoding);

} catch (error) {
  console.error('Failed to get system locale', error);
}



const parser = yargs(process.argv.slice(2))
  .option({
    'c': { alias: "bytes", describe: "Outputs the amount bytes in a file", type: "boolean", demandOption: false },
    'l': { alias: "lines", describe: "Outputs the amount lines in a file", type: "boolean", demandOption: false },
    'w': { alias: "words", describe: "Outputs the amount words in a file", type: "boolean", demandOption: false },
    'm': { alias: "chars", describe: "Outputs the amount characters in a file", type: "boolean", demandOption: false }
  });

(async () => {
  const readFile = util.promisify(fs.readFile);

  const argv: Arguments = await parser.parse();
  const outputResult: Output = {
    byteCount: 0,
    fileName: undefined,
    lineCount: 0,
    wordCount: 0,
    charCount: 0
  }

  outputResult.fileName = argv['_']?.[0] as string; // Cast the value to string

  if (!outputResult.fileName) {
    console.error("File name is required");
    process.exit(1);
  }

  let fileContents: Buffer | undefined = await readFile(outputResult.fileName).catch((err) => {
    console.error(err);
    process.exit(1);
  });

  if(!argv.c && !argv.l && !argv.w && !argv.m) {
    const wordPattern = /\s\S/g;
    outputResult.byteCount = fileContents.byteLength;
    outputResult.lineCount = fileContents.toString().split('\n').length;
    outputResult.wordCount = [...fileContents.toString().split(wordPattern)].length;
    console.table(outputResult);

    process.exit(0);
  }

  if (argv.c && fileContents) {
    outputResult.byteCount = fileContents.byteLength;
  }

  if (argv.l && fileContents) {
    outputResult.lineCount = fileContents.toString().split('\n').length;
  }

  if (argv.w && fileContents) {
    const wordPattern = /\s\S/g;
    outputResult.wordCount = [...fileContents.toString().split(wordPattern)].length;
  }

  if (argv.m && fileContents) {
    if(!multiByteSupport) {
      outputResult.byteCount = fileContents.byteLength;
    }

    outputResult.charCount = fileContents.toString().length;
  }

  console.table(outputResult);
})();
