"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const listr_1 = tslib_1.__importDefault(require("listr"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const shelljs_1 = tslib_1.__importDefault(require("shelljs"));
const constants_1 = require("./constants");
const constants_2 = require("../../constants");
exports.backupOldDotfiles = () => new listr_1.default(Object.values(constants_1.DOTFILES).map(file => ({
    title: file,
    task: () => {
        try {
            return fs_1.default.renameSync(`${constants_2.HOME}/${file}`, `${constants_2.HOME}/${file}.old`);
        }
        catch (error) {
            // Avoid trash error message
        }
    },
})));
exports.installDotFiles = () => new listr_1.default(Object.keys(constants_1.DOTFILES).map(source => ({
    title: source,
    task: () => shelljs_1.default.ln('-sf', path_1.default.resolve(source), path_1.default.resolve(constants_2.HOME, constants_1.DOTFILES[source])),
})));
