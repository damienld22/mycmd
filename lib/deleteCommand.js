const { deleteCommandFromStorage } = require('./storage');

/**
 * Delete a command from his name
 * @param {String} commandName Name of the command to delete
 */
const deleteCommand = (commandName) => {
  if (commandName && commandName.length > 0) {
    deleteCommandFromStorage(commandName);
  } else {
    console.log('Missing command. Please put the name of the command to delete');
  }
};

module.exports = deleteCommand;
