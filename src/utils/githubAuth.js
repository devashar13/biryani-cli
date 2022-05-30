import CLI from "clui";
import Configstore from "configstore";
const { Octokit } = require("@octokit/core");
import axios from "axios";
const Spinner = CLI.Spinner;
import { createBasicAuth } from "@octokit/auth-basic";
import inquirer from "inquirer";
const pkg = require("../../package.json");

const conf = new Configstore(pkg.name);
let auth;
let libversions = {}
const askGithubCredentials = async () => {
  const questions = [
    {
      name: "personalAuthToken",
      type: "input",
      message: `Enter your github personal access token:
                  To create a token check :https://github.com/settings/tokens/new?scopes=repo`,
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

export default {
  getInstance: () => {
    return octokit;
  },

  getStoredGithubToken: async () => {
    return conf.get("github.token");
  },

  getPersonalAccesToken: async () => {
    const credentials = await askGithubCredentials();
    const status = new Spinner("Authenticating you, please wait...");

    status.start();
    try {
      auth = new Octokit({ auth: credentials.personalAuthToken });
      conf.set("github.token", credentials.personalAuthToken);
      return credentials.personalAuthToken;
    } finally {
      status.stop();
    }
  },
  getRepository: async (token) => {
    auth = new Octokit({ auth: token });
    const repo = await auth.request("GET /repos/devashar13/kushibot-api", {
      owner: "devashar13",
      repo: "kushibot-api",
    });
    return repo;
  },
  getContents: async (token, path) => {
    auth = new Octokit({ auth: token });
    const contents = await auth.request(
      "GET /repos/devashar13/nftshop-IT-Project/contents/package.json",
      {
        owner: "devashar13",
        repo: "nftshop-IT-Project",
        path: "package.json",
      }
    );
    // console.log(contents);
    const x = await axios.get(contents.data.download_url).then((response) => {
        libs = response.data;
    });
  },
};
