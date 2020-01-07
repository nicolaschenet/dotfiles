"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const listr_1 = tslib_1.__importDefault(require("listr"));
const utils_1 = require("../../utils");
const constants_1 = require("./constants");
exports.installHomebrew = () => utils_1.execCommand('curl -fsSL raw.githubusercontent.com/Homebrew/install/master/install | ruby');
exports.installBrewFormulae = () => new listr_1.default(constants_1.BREW_FORMULAE.map(formula => ({
    title: formula,
    task: () => utils_1.execCommand(`brew install ${formula}`),
})));
exports.installBrewCasks = () => new listr_1.default(constants_1.BREW_CASKS.map(cask => ({
    title: cask,
    task: () => utils_1.execCommand(`brew cask install ${cask}`),
})));
