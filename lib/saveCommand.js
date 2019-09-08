const readline = require('readline');
const { putCommandToStorage } = require('./storage');
const rl = readline.createInterface({
  input: process.stderr,
  output: process.stdout
});

/**
 * Save the command asking name, description and keywords to the user
 */
const saveACommand = async () => {
  // Ask user to type the name of the command
  rl.question('Type the name of the command : ', answer => {
    const name = answer;
    rl.question('Type the description of the command : ', answer => {
      const description = answer;
      rl.question('Type the keywords of the command (separate by commas) : ', answer => {
        const keywords = answer && answer.length > 0 ? answer.split(',') : [];
        putCommandToStorage({ name, description, keywords });
      });
    });
  });
};

module.exports = saveACommand;
