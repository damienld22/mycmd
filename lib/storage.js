const homeDir = require('os').homedir();
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

/**
 * Parse storage file to return content as object
 * @param {String} contentFile Content of the storage file
 */
const parseStorageFile = (contentFile) => {
  const foundCommands = [];
  const linePerLineFile = contentFile.split('\n');

  linePerLineFile.forEach(line => {
    const splitLine = line.split(SEPARATOR_IN_LINE);

    foundCommands.push({
      name: splitLine[0],
      description: splitLine[1],
      keywords: splitLine[2].split(',')
    });
  });
  return foundCommands;
};

module.exports = {
  getAllCommandsFromStorage
};
