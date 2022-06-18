
const arg = require("arg");
const github  = require("./utils/githubAuth");
const helper = require("./utils/helpers");
const githubActions = require("./github")
const chalk = require("chalk");
const figlet = require("figlet");

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--input": String,
      "-u": Boolean,
      "--help": Boolean,
      "-i": "--input",
      "-h": "--help",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    fileInput: args["--input"] || "",
    library: args._[0],
    update: args["-u"] || false,
    help: args["--help"] || false,
  };
}

async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  console.log(
    chalk.yellow(figlet.textSync("Biryani", { horizontalLayout: "full" }))
  );
  //   options = await prompForMissingOptions(options);

  // if no argument is given
  if(options.help){
    
    console.log(`
    Usage:
      $ biryani [options] <library>
    Options:
      -i, --input   List current version and check if it satisfies the given version
      -u, --update  Update the library version
      -h, --help    Show help
    `);
    return;
  }

  if (!options.library && !options.update && !options.fileInput) {
    return;
  }
  let token = await github.getStoredGithubToken();
  if (!token) {
    token = await github.getPersonalAccesToken();
  }
  if (!options.library) {
    console.log("Please provide a library name");
    return;
  }
  if (options.fileInput == "") {
    console.log("Please provide a csv file containing the github repositories");
    return;
  }
  const { libversions, data } = await github.getContents(token, options);

  if (!options.update) {
    await helper.createTable(libversions);
    return;
  }
  if (options.update) {
    await helper.createTable(libversions);
    const makePR = await githubActions.makePR(token, options);
    await helper.createUpdateTable(libversions, makePR);
  }
}

module.exports = {
  cli
}
