


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="dyte-submissions/dyte-vit-2022-devashar13">
    <img src="https://i.postimg.cc/XJXTMMXZ/image.png" alt="Logo">
  </a>

<h3 align="center">Biryani CLI</h3>

  <p align="center">
A tool to manage all your dependencies. 
    <br />
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-devashar13"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-devashar13">View Demo</a>
    ·
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-devashar13/issues">Report Bug</a>
    ·
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-devashar13/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
<p align="center">
  <img src="https://i.postimg.cc/yx8WC8cm/biryanihelp.png" alt="Logo">
</p>

**Biryani** is a tool created to manage dependecies of your github repositories without locally installing any of them . Given the current version of a dependency with a csv of repositories, biryani tell if the version is greater than or equal to the version specified or not and update it and create a pull request. 

### Built With

* [arg](https://www.npmjs.com/package/arg)
* [octokit](https://www.npmjs.com/package/octokit/)
* [chalk](https://www.npmjs.com/package/chalk)
* [cli-table](https://www.npmjs.com/package/cli-table)
* [configstore](https://svelte.dev/)
* [configstore](https://www.npmjs.com/package/configstore)
* [esm](https://www.npmjs.com/package/esm)
* [inquirer](https://www.npmjs.com/package/inquirer)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* Github private access token
  Create a personal access token from : https://github.com/settings/tokens/new?scopes=repo,user
  (will be only asked )

### Installation
 1. Install NPM packages
```sh
npm install -g @devashar13/biryani
```
And biryani will be installed globally to your system path.
<!-- USAGE EXAMPLES -->

## Usage

To check if installation was successful, use the command: 

```
biryani
```
After installation, run the command below in your terminal:

```
biryani --help 
```
Create a .csv file with the format 
 ```
 name,repo
 reponame,https://github.com/username/reponame
 ```
 Check <a href="https://github.com/dyte-submissions/dyte-vit-2022-devashar13/blob/main/input.csv">Sample CSV</a>

The help menu with all the options will be listed. 


```
biryani -i <path-to-csv> <library@version>
```
Use the above command to get current version of the library being used in the repositories and check if the version is satisfied with the given version

Sample Output:
[![image.png](https://i.postimg.cc/Dwcn2gZh/image.png)](https://postimg.cc/rDzvj5xZ)

```
biryani -u -i <path-to-csv> <library@version>
```
Use the above command to get current version of the library being used in the repositories and check if the version is satisfied with the given version and update the version and create a pull request


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/-submissions/dyte-vit-2022-devashar13/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
Project Link: [https://github.com/dyte-submissions/dyte-vit-2022-devashar13](https://github.com/github_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
