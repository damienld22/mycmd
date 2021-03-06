const homeDir = require('os').homedir();
const process = require('process');
const path = require('path');
const fs = require('fs');
const STORAGE_FILE_PATH = path.join(homeDir, '.mycmd');
const SEPARATOR_IN_LINE = ';;';

/**
 * Read the storage file to get all commands
 */
const getAllCommandsFromStorage = () => {
  try {
    const contentFile = fs.readFileSync(STORAGE_FILE_PATH, 'utf8');
    return parseStorageFile(contentFile);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`Failed to find the storage file at the path : ${STORAGE_FILE_PATH}`);
    } else {
      console.error(err);
    }
    return [];
  }
};

/**
 * Write a command in the file
 * @param {Object} command command to save with it properties
 */
const putCommandToStorage = (command) => {
  // Stringify the command and save it
  try {
    fs.appendFileSync(STORAGE_FILE_PATH, stringifyCommandForStorage(command), 'utf8');
    console.log(`Command '${command.name}' saved!`);
    process.exit(0);
  } catch (err) {
    console.log(`Failed to save the command ${command.name}. Error : ${err}`);
  }
};

/**
 * Delete the command entry in the file
 * @param {String} commandName Command name to delete
 */
const deleteCommandFromStorage = (commandName) => {
  try {
    const contentFile = fs.readFileSync(STORAGE_FILE_PATH, 'utf8');
    const contentByLine = contentFile.split('\n');
    const newContentByLine = contentByLine
      .map(line => {
        if (line.split(SEPARATOR_IN_LINE)[0] !== commandName) {
          return line;
        }
      })
      .filter(line => !!line);
    if (contentByLine.length === newContentByLine.length) {
      console.log(`Unable to found the command : ${commandName}`);
    } else {
      fs.writeFileSync(STORAGE_FILE_PATH, newContentByLine, 'utf8');
      console.log(`Command '${commandName}' deleted!`);
    }
  } catch (err) {
    console.error(`Failed to delete the command : ${commandName}`);
  }
};

/**
 * Transform command to a String to save it in the storage file
 * @param {Object} command Command to save
 */
const stringifyCommandForStorage = (command) => {
  return `${command.name}${SEPARATOR_IN_LINE}${command.description}${SEPARATOR_IN_LINE}${command.keywords.join(',')}\n`;
};

/**
 * Parse storage file to return content as object
 * @param {String} contentFile Content of the storage file
 */
const parseStorageFile = (contentFile) => {
  const foundCommands = [];
  const linePerLineFile = contentFile.split('\n');

  linePerLineFile.forEach(line => {
    if (line.length > 0) {
      const splitLine = line.split(SEPARATOR_IN_LINE);

      foundCommands.push({
        name: splitLine[0],
        description: splitLine[1],
        keywords: splitLine[2] ? splitLine[2].split(',') : []
      });
    }
  });
  return foundCommands;
};

module.exports = {
  getAllCommandsFromStorage,
  putCommandToStorage,
  deleteCommandFromStorage
};
