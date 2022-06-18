const { Octokit } = require("@octokit/rest");
const helpers = require("./utils/helpers");
const inquirer = require("inquirer");
const githubAuth = require("./utils/githubAuth");

const links = [];
let useEmail = "";
const makeLibsArray = (libs) => {
  const stats = [];
  const x = Object.keys(libs);
  for (let i = 0; i < x.length; i++) {
    stats.push([x[i], ...libs[x[i]]]);
  }
  return stats;
};

const createPullRequest = async (
  token,
  options,
  repoUser,
  updateSha,
  version,
  branchName,
  defaultBranch
) => {
  const octokit = new Octokit({
    auth: token,
  });
  const pullRequest = await octokit.rest.pulls.create({
    owner: repoUser[0],
    repo: repoUser[1],
    title: `Bump ${options.library.split("@")[0]}${version} to ${options.library.split("@")[1]}`,
    head: branchName,
    base: defaultBranch,
    body: `Bump ${version} to ${options.library.split("@")[1]}`,
  });
  console.log(
    `Pull request created at:${pullRequest.data.url
      .replace("api.", "")
      .replace("/repos", "")
      .replace("pulls", "pull")}`
  );
  links.push(
    pullRequest.data.url
      .replace("api.", "")
      .replace("/repos", "")
      .replace("pulls", "pull")
  );

  // create table with updated version and url
};

const createBranch = async (token, options, user, csvContents) => {
  // create a branch
  // get the sha of the master branch

  const octokit = new Octokit({
    auth: token,
  });

  //   commit change in package.json
  const { libversions, pkg } = await githubAuth.getContents(token, options);
  const stats = makeLibsArray(libversions);
  for (let i = 0; i < stats.length; i++) {
    const repoUser = csvContents[i].repo
      .replace("https://github.com/", "")
      .split("/");

    const repoDetails = await octokit.repos.get({
      owner: repoUser[0],
      repo: repoUser[1],
    });
    const defaultBranch = repoDetails.data.default_branch;
    if (stats[i][3] == "no") {
      const masterRef = await octokit.rest.git.getRef({
        owner: repoUser[0],
        repo: repoUser[1],
        ref: `heads/${defaultBranch}`,
      });

      const branchRef = masterRef.data.object.sha;
      // create new branch
      //   add random number in the end
      const branchName = `bump-${options.library}-${Math.floor(
        Math.random() * 1000
      )}`;

      const newRef = await octokit.rest.git.createRef({
        owner: repoUser[0],
        repo: repoUser[1],
        ref: "refs/heads/"+branchName,
        sha: branchRef,
      });
      console.log("New Branch created🎉");

      const data = pkg[i];
      data.dependencies[options.library.split("@")[0]] = `^${
        options.library.split("@")[1]
      }`;

      const sha = pkg[i].sha;
      //   delete sha
      delete data.sha;

      let objJsonStr = JSON.stringify(data);
      let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
      const email = await octokit.rest.users.listEmailsForAuthenticatedUser();

      if (useEmail === "") {
        const askList = [];
        if (email.data.length > 1) {
          for (let i = 0; i < email.data.length; i++) {
            askList.push(email.data[i].email);
          }
          useEmail = await inquirer.prompt([
            {
              name: "email",
              type: "list",
              message: "Use the email you want to use to commit the changes",
              choices: askList,
            },
          ]);
          useEmail = useEmail.email;
        } else {
          useEmail = email.data[0].email;
        }
      }
      console.log(useEmail);
      const update = await octokit.rest.repos.createOrUpdateFileContents({
        owner: repoUser[0],
        repo: repoUser[1],
        path: "package.json",
        message: "bump version",
        branch: branchName,
        sha: sha,

        content: objJsonB64,
      });
      //   get update sha
      const updateSha = update.data.content.sha;
      console.log("Changes Created🎉");
      await createPullRequest(
        token,
        options,
        repoUser,
        updateSha,
        stats[i][2],
        branchName,
        defaultBranch
      );
    } else {
      continue;
    }
  }
  return;
};
module.exports = {
  makePR: async (token, options) => {
    const csvContents = await helpers.parseCSV(options);
    const octokit = new Octokit({
      auth: token,
    });
    const user = await octokit.rest.users.getAuthenticated();
    const userName = user.data.login;
    await createBranch(token, options, user, csvContents);
    return links;

    // for (let i = 0; i < csvContents.length; i++) {
    //   if (csvContents[i].name == "") {
    //     continue;
    //   }
    //   const repoUser = csvContents[i].repo
    //     .replace("https://github.com/", "")
    //     .split("/");
    //   try {
    //     const check_collab = await octokit.rest.repos.checkCollaborator({
    //       owner: repoUser[0],
    //       repo: repoUser[1],
    //       username: userName,
    //     });
    //     if (check_collab.status == 204) {
    //     }
    //   } catch (e) {
    //     if (e.status == 403) {
    //       console.log(
    //         "You are not collaborator of this repository, we will fork and make a pr"
    //       );
    //       await createFork();
    //     }
    //   }
    // }
  },
};