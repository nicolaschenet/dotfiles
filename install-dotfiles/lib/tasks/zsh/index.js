"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const listr_1 = tslib_1.__importDefault(require("listr"));
const shelljs_1 = tslib_1.__importDefault(require("shelljs"));
const constants_1 = require("../../constants");
exports.installZshSyntaxHighlighting = (_ctx, task) => new Promise(resolve => {
    const stderr = shelljs_1.default.exec(`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${constants_1.HOME}/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting`, { silent: true }).stderr;
    if (stderr.indexOf('exists') !== -1) {
        task.skip('Plugin already installed.');
    }
    resolve();
});
exports.installP10K = (_ctx, task) => new Promise(resolve => {
    const stderr = shelljs_1.default.exec(`git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${constants_1.HOME}/.oh-my-zsh/custom/themes/powerlevel10k`, { silent: true }).stderr;
    if (stderr.indexOf('exists') !== -1) {
        task.skip('Plugin already installed.');
    }
    resolve();
});
exports.installOhMyZsh = (_ctx, task) => new Promise(resolve => {
    const stdout = shelljs_1.default.exec('curl -fsSL raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh', { silent: true }).stdout;
    if (stdout.indexOf('installed') !== -1) {
        task.skip('You already have Oh My Zsh installed.');
    }
    resolve();
});
exports.installZshPlugins = () => new listr_1.default([{
        title: 'zsh-syntax-highlighting',
        task: exports.installZshSyntaxHighlighting,
    }, {
        title: 'power-level-10k ',
        task: exports.installP10K,
    }]);
