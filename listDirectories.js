#!/usr/bin/env node

const { lstatSync, readdirSync } = require("fs");
const { join, resolve } = require("path");
const { exec } = require("child_process");

// Configure yargs
const yargs = require("yargs")
  .usage("Usage: $0 --path [path] --query [string]")
  .option("path", {
    alias: "p",
    describe: "Path to a folder",
    type: "string",
    demandOption: process.env.NODE_ENV !== 'debug' ? true : false
  })
  .help();

const args = yargs.argv;

class QuickOpen {
  /**
   * Get the full path and substitue shell stuff like `~` or environment variables
   * @param path
   * @returns Promise
   */
  getFullPathToDirectories = path =>
    new Promise((resolve, reject) => {
      exec(`cd ${path}`, function(error, stdout, stderr) {
        if (error) {
          reject(stderr);
        }

        exec(
          `echo $(cd $(dirname ${path}); pwd)/$(basename ${path});`,
          function(error, stdout, stderr) {
            if (error) {
              reject(error);
            }

            resolve(stdout.trim());
          }
        );
      });
    });

  /**
   * Get all subdirectories in a directory
   * @param path
   * @returns array directories
   */
  getDirectories = path => 
    readdirSync(path.trim(), { withFileTypes: true })
        .filter(directory => directory.isDirectory())
        .map(directory => directory.name);

    buildAlfredObject = (directories, pathToDirectories) => {
        return { items: [
            ...directories.map(directoryName => {
                const fullPathWithDirectory = resolve(pathToDirectories, directoryName);
                
                return {
                    uid: directoryName,
                    type: 'file',
                    title: directoryName,
                    arg: fullPathWithDirectory,
                    autocomplete: directoryName,
                    icon: {
                        type: 'fileicon',
                        path: fullPathWithDirectory
                    }
                }
            })
        ]}
    }

  constructor(options) {
    this.getFullPathToDirectories(options.path)
      .then(fullPathToDirectories => {
        const subDirectories = this.getDirectories(fullPathToDirectories);
        const alfredObject = this.buildAlfredObject(subDirectories, fullPathToDirectories);
        
        if(process.env.NODE_ENV === 'debug') {
          console.log(`Given path: ${options.path}`);
          console.log(`Array of directories from ${fullPathToDirectories}:`);
          console.log(subDirectories);
          console.log('Alfred object:');
          console.log(alfredObject);
          console.log('Alfred object as JSON:');
        }
        
        process.stdout.write(JSON.stringify(alfredObject));
      })
      .catch(error => {
        console.error(`Path given doesn't exist or couldn't be resolved.`, error);
      });
  }
}

if(process.env.NODE_ENV !== 'debug') {
  const quickOpen = new QuickOpen({ path: args.path });
} else {
  const quickOpen = new QuickOpen({ path: '~' });
}