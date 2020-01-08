"use strict";
const tslib_1 = require("tslib");
/* eslint-disable no-console */
const command_1 = require("@oclif/command");
const { Form } = require('enquirer');
const shelljs_1 = tslib_1.__importDefault(require("shelljs"));
const listr_1 = tslib_1.__importDefault(require("listr"));
const homebrew_1 = require("./tasks/homebrew");
const zsh_1 = require("./tasks/zsh");
const vscode_1 = require("./tasks/vscode");
const yarn_1 = require("./tasks/yarn");
const system_1 = require("./tasks/system");
const dotfiles_1 = require("./tasks/dotfiles");
const git_1 = require("./tasks/git");
let userInfos = {};
const setUserInfos = (infos) => {
    userInfos = Object.assign(Object.assign({}, userInfos), infos);
};
const homebrew = () => new listr_1.default([{
        title: 'Install Homebrew',
        task: homebrew_1.installHomebrew,
        skip: () => false,
    }, {
        title: 'Install formulae',
        task: homebrew_1.installBrewFormulae,
        skip: () => false,
    }, {
        title: 'Install casks',
        task: homebrew_1.installBrewCasks,
        skip: () => false,
    }]);
const zsh = () => new listr_1.default([{
        title: 'Install Oh My Zsh',
        task: zsh_1.installOhMyZsh,
        skip: () => false,
    }, {
        title: 'Install plugins',
        task: zsh_1.installZshPlugins,
        skip: () => false,
    }]);
const system = () => new listr_1.default([{
        title: 'Install command line tools',
        task: system_1.installCliTools,
        skip: () => false,
    }, {
        title: 'Install custom fonts',
        task: system_1.installFonts,
        skip: () => false,
    }, {
        title: 'Setup MacOS',
        task: system_1.setupMacOS,
        skip: () => false,
    }]);
const dotfiles = () => new listr_1.default([{
        title: 'Backup old dotfiles',
        task: dotfiles_1.backupOldDotfiles,
        skip: () => false,
    }, {
        title: 'Install new dotfiles',
        task: dotfiles_1.installDotFiles,
        skip: () => false,
    }]);
const tasks = new listr_1.default([{
        title: 'Homebrew',
        task: homebrew,
        skip: () => false,
    }, {
        title: 'Zsh',
        task: zsh,
        skip: () => false,
    }, {
        title: 'Install Visual Studio Code extensions',
        task: vscode_1.installVsCodeExtensions,
        skip: () => false,
    }, {
        title: 'Install Yarn global packages',
        task: yarn_1.installYarnPackages,
        skip: () => false,
    }, {
        title: 'System',
        task: system,
        skip: () => false,
    }, {
        title: 'Dotfiles',
        task: dotfiles,
        skip: () => false,
    }, {
        title: 'Git setup',
        task: () => git_1.git(userInfos),
        skip: () => false,
    }]);
const runTasks = () => {
    console.log('\n✨ Setting up laptop, grab a coffee and enjoy :)');
    console.log('===============================================\n');
    tasks
        .run()
        .then(() => {
        console.log("\n🎉  You're all good!");
        console.log('\nℹ️  Note that some of the changes require a logout/restart to take effect.');
    })
        .catch(error => {
        console.error(error);
    });
};
class InstallDotfiles extends command_1.Command {
    async run() {
        // Ask for sudo privileges upfront
        shelljs_1.default.exec('sudo -v');
        // Clear screen
        shelljs_1.default.exec('clear');
        // Ask for some user specific information
        const prompt = new Form({
            name: 'user',
            message: '🕵️  Before we continue, please tell me more about you 🕵️',
            choices: [
                { name: 'firstname', message: 'First name', initial: 'Nicolas' },
                { name: 'lastname', message: 'Last name', initial: 'Chenet' },
                { name: 'email', message: 'Git user email', initial: 'nicolas.chenet@datadoghq.com' },
            ],
        });
        prompt.run()
            .then((info) => {
            // Store user info for further use
            setUserInfos(info);
            // Run the tasks
            runTasks();
        })
            .catch(console.error);
    }
}
module.exports = InstallDotfiles;
