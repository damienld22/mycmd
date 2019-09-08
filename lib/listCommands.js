const { getAllCommandsFromStorage } = require('./storage');

const listCommands = () => {
  // Get all commands from the storage and display them
  displayAllCommands(getAllCommandsFromStorage());
};

/**
 * Display the commands in the standard output
 * @param {Array<Object>} commands List of commands
 */
const displayAllCommands = (commands) => {
  commands.forEach(command => {
    console.log(`${command.name} : ${command.description}`);
  });
};

module.exports = listCommands;
