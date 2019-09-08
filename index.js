/**
 * Start file of the CLI
 */
const program = require('commander');
const process = require('process');
const version = require('./package.json').version;
const listCommands = require('./lib/listCommands');
const saveCommand = require('./lib/saveCommand');
const deleteCommand = require('./lib/deleteCommand');

program
  .version(version)
  .description('Basic CLI to save / list / search Unix commands')
  .option('-l, --list, List all commands')
  .option('-s, --save, Save a command')
  .option('-d, --delete <name>, Delete a command')
  .parse(process.argv);

if (program.list) {
  listCommands();
  process.exit(0);
} else if (program.save) {
  saveCommand();
} else if (program.delete) {
  deleteCommand(program.delete);
  process.exit(0);
} else {
  console.log('Unknow command');
}
