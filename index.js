/**
 * Start file of the CLI
 */
const program = require('commander');
const version = require('./package.json').version;

program
  .version(version)
  .description("Basic CLI to save / list / search Unix commands")
  .parse(process.argv);


