const Configstore = require("configstore");
const { Octokit } = require("@octokit/core");
const axios = require("axios");
const inquirer = require("inquirer");
const helper = require("./helpers");
const pkg = require("../../package.json");
const conf = new Configstore(pkg.name);
let auth;
let libversions = {};
const askGithubCredentials = async () => {
  const questions = [
    {
      name: "personalAuthToken",
      type: "input",
      message: `Enter your github personal access token:
To create a token check :https://github.com/settings/tokens/new?scopes=repo,user`,
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Enter your github personal access token.";
        }
      },
    },
  ];
  return inquirer.prompt(questions);
};

const compareVersions = (version1, version2) => {
  const v1 = version1.split(".");
  const v2 = version2.split(".");
  const greater = true;
  // if all values are equal
  if (
    Number(v1[0].replace("^", "")) == Number(v2[0].replace("^", "")) &&
    Number(v1[1]) == Number(v2[1]) &&
    Number(v1[2]) == Number(v2[2])
  ){
    return true;
  }
  if (Number(v1[0].replace("^", "")) > Number(v2[0].replace("^", ""))) {
    return greater;
  }
  if (
    Number(v1[0].replace("^", "")) == Number(v2[0].replace("^", "")) &&
    Number(v1[1]) > Number(v2[1])
  ) {
    return greater;
  }
  if (
    Number(v1[0].replace("^", "")) == Number(v2[0].replace("^", "")) &&
    Number(v1[1]) == Number(v2[1]) &&
    Number(v1[2]) > Number(v2[2])
  ) {
    return greater;
  }
  return !greater;
};

module.exports = {
  getStoredGithubToken: async () => {
    return conf.get("github.token");
  },
  getInstance: () => {
    return octokit;
  },

  getPersonalAccesToken: async () => {
    const credentials = await askGithubCredentials();

    try {
      auth = new Octokit({ auth: credentials.personalAuthToken });
      conf.set("github.token", credentials.personalAuthToken);
      return credentials.personalAuthToken;
    } finally {
    }
  },
  // getRepository: async (token) => {
  //   auth = new Octokit({ auth: token });
  //   const repo = await auth.request("GET /repos/devashar13/kushibot-api", {
  //     owner: "devashar13",
  //     repo: "kushibot-api",
  //   });
  //   return repo;
  // },
  getContents: async (token, options) => {
    const pkg = [];
    auth = new Octokit({ auth: token });
    const csvContents = await helper.parseCSV(options);
    for (let i = 0; i < csvContents.length; i++) {
      if (csvContents[i].name == "") {
        continue;
      }

      const repoUser = csvContents[i].repo
        .replace("https://github.com/", "")
        .split("/");
      const contents = await auth.request(
        `GET /repos/${repoUser[0]}/${repoUser[1]}/contents/package.json`,
        {
          owner: repoUser[0],
          repo: repoUser[1],
          path: "package.json",
        }
      );

      // console.log(contents);
      const x = await axios.get(contents.data.download_url).then((response) => {
        const data = response.data;

        data.sha = contents.data.sha;
        pkg.push(data);
        const lib = options.library.split("@");
        if (data.dependencies[lib[0]]) {
          if (compareVersions(data.dependencies[lib[0]], lib[1])) {
            libversions[csvContents[i].name] = [
              csvContents[i].repo,
              data.dependencies[lib[0]],
              "yes",
            ];
          } else {
            libversions[csvContents[i].name] = [
              csvContents[i].repo,
              data.dependencies[lib[0]],
              "no",
            ];
          }
        }
      });
    }
    return { libversions, pkg };
  },
  getPackage: async (token, options) => {
    auth = new Octokit({ auth: token });
    const pkg = [];
    const csvContents = await helper.parseCSV(options);
    for (let i = 0; i < csvContents.length; i++) {
      if (csvContents[i].name == "") {
        continue;
      }
      const repoUser = csvContents[i].repo
        .replace("https://github.com/", "")
        .split("/");
      const contents = await auth.request(
        `GET /repos/${repoUser[0]}/${repoUser[1]}/contents/package.json`,
        {
          owner: repoUser[0],
          repo: repoUser[1],
          path: "package.json",
        }
      );

      const x = await axios.get(contents.data.download_url).then((response) => {
        data = response.data;
        pkg.push(data);
      });
    }
    return pkg;
  },
};
