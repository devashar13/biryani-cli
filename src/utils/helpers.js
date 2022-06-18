const fs = require("fs");
const path = require("path");
const {promisify} = require("util");
var Table = require("cli-table3");

const access = promisify(fs.access);
module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },
  parseCSV: (options) => {
    // read csv from current folder
    if (!options.fileInput) {
      console.log("Please provide a csv file");
      return;
    }
    const csv = fs.readFileSync(options.fileInput, "utf8");
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const data = lines.slice(1).map((line) => {
      const values = line.split(",");
      return values.reduce((obj, value, index) => {
        obj[headers[index]] = value;
        return obj;
      }, {});
    });
    return data;
  },
  createTable: (repoStats) => {
    const stats = [];
    const x = Object.keys(repoStats);
    for (let i = 0; i < x.length; i++) {
      stats.push([x[i], ...repoStats[x[i]]]);
    }
    const table = new Table({
      head: ["name", "repo", "version", "version_satisfied"],
    });
    stats.forEach((repo) => {
      table.push(repo);
    });

    console.log(table.toString());
  },
  createUpdateTable: (repoStats, makePR) => {
    const stats = [];
    const x = Object.keys(repoStats);
    for (let i = 0; i < x.length; i++) {
      stats.push([x[i], ...repoStats[x[i]]]);
    }
    // add makepr to stats
    let y = 0;
    for (let i = 0; i < stats.length; i++) {
      if (stats[i][3] == "no") {
        stats[i].push(makePR[y]);
        y++;
      } else {
        stats[i].push("");
      }
    }

    const table = new Table({
      head: ["name", "repo", "version", "version_satisfied", "pr_link"],
    });
    stats.forEach((repo) => {
      table.push(repo);
    });

    console.log(table.toString());
  },
};
