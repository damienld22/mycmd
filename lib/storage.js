const homeDir = require('os').homedir();
const process = require('process');
const path = require('path');
const fs = require('fs');
const STORAGE_FILE_PATH = path.join(homeDir, '.mycmd');
const SEPARATOR_IN_LINE = ';;';

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
  putCommandToStorage
};
