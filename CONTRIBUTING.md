# Contributing

Thank you for considering to contribute to Surfbird, whether it is a simple bug report or an entire feature you might have planned out, everything is appreciated and welcome!

### I have a problem/question!

Do you have a question regarding Surfbird or a specific problem with something? if there is no issue for it yet, [please open one](https://github.com/surfbirdapp/surfbird/issues/new)!

### I found a bug!

If you think you found a bug in Surfbird, please search through [all issues](https://github.com/surfbirdapp/surfbird/issues?q=) before opening another one!

If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/surfbirdapp/surfbird/issues/new). Be sure to include a title and clear description, as much relevant information as possible, maybe even include a screenshot, the more the better!

### I think I can fix/add it!

Awesome! You can follow our [Development Setup](docs/development-setup.md) guide to set up a development environment for Surfbird!

Once the setup is up and running, you're ready to implement your feature or fix.

* [Fork](https://github.com/surfbirdapp/surfbird/fork) the repository
* Create a branch for your changes
  * Use Git Flow-like `feature/` or `fix/` prefixes for your branch names
  * Try to keep the branch names short, but on topic
  * If existing, prepend an issue ID to your branch name
  * _**Example:** `feature/12-locales`_
* Commit your changes into the branch
  * Follow the [conventional commits](https://conventionalcommits.org/) style for your commit messages
  * Be sure that your code is following all used codestyles properly. The used linters should usually complain about problems while development.

Almost ready to open that Pull Request! But before we hop into the action, better get sure that you are up-to-date with the master branch!

```
git remote add upstream git@github.com:surfbirdapp/surfbird.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master, and push it!

```
git checkout feature/12-locales
git rebase master
git push --set-upstream origin feature/12-locales
```

Now you're ready to submit your [Pull Request](https://github.com/surfbirdapp/surfbird/compare)!

After your Pull Request has been checked by a maintainer and everything is okay, it will get merged into the upstream code.

If there are any issues or other kind of feedback, you will notice
in follow-up discussion around your Pull Request.

Once everything has been cleared up, your fix or feature is ready to be shipped. Well done, you finished your contribution!

---

_This Contribution Guideline is inspired by [activeadmin](https://github.com/activeadmin/activeadmin/blob/master/CONTRIBUTING.md), taking some key aspects and explanations from it!_

