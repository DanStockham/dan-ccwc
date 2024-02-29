#!/usr/bin/env node

import yargs from 'yargs'
import fs from 'fs';
import util from 'util';

interface Arguments {
  [x: string]: unknown;
  _:(string | number)[] | undefined;
  c: boolean | undefined;
}

interface Output {
  byteCount: number;
  fileName: string | undefined;
  lineCount: number | undefined;
}

const parser = yargs(process.argv.slice(2))
  .option({
    'c': { alias: "bytes", describe: "Outputs the amount bytes in a file", type: "boolean", demandOption: false },
    'l': { alias: "lines", describe: "Outputs the amount lines in a file", type: "boolean", demandOption: false }
  });

  (async() => {
    const readFile = util.promisify(fs.readFile);

    const argv: Arguments = await parser.parse();
    const outputResult: Output = {
      byteCount: 0,
      fileName: undefined,
      lineCount: 0
    }

    console.log(argv);
    outputResult.fileName = argv['_']?.[0] as string; // Cast the value to string

    if (!outputResult.fileName) {
      console.error("File name is required");
      process.exit(1);
    }

    let fileContents: Buffer | undefined = await readFile(outputResult.fileName).catch((err) => {
      console.error(err);
      process.exit(1);
    });

    if (argv.c && fileContents) {
      outputResult.byteCount = fileContents.byteLength;
    }

    if(argv.l && fileContents) {
      outputResult.lineCount = fileContents.toString().split('\n').length;
    }

    console.table(outputResult);
  })();