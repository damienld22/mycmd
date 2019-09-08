/**
 * Start file of the CLI
 */
const program = require('commander');
const version = require('./package.json').version;
const listCommands = require('./lib/listCommands');

program
  .version(version)
  .description('Basic CLI to save / list / search Unix commands')
  .option('-l, --list, List all commands')
  .parse(process.argv);

if (program.list) {
  listCommands();
}
