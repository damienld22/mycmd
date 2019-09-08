/**
 * Start file of the CLI
 */
const program = require('commander');
const process = require('process');
const version = require('./package.json').version;
const listCommands = require('./lib/listCommands');
const saveCommand = require('./lib/saveCommand');

program
  .version(version)
  .description('Basic CLI to save / list / search Unix commands')
  .option('-l, --list, List all commands')
  .option('-s, --save, Save a command')
  .parse(process.argv);

if (program.list) {
  listCommands();
  process.exit(0);
} else if (program.save) {
  saveCommand();
} else {
  console.log('Unknow command');
}
