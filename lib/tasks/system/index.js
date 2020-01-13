"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const shelljs_1 = tslib_1.__importDefault(require("shelljs"));
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
exports.installCliTools = (_ctx, task) => new Promise(resolve => {
    const stderr = shelljs_1.default.exec('xcode-select --install', { silent: true }).stderr;
    if (stderr.indexOf('already installed') !== -1) {
        task.skip('Command line tools are already installed, use "Software Update" to install updates');
    }
    resolve();
});
exports.installFonts = () => shelljs_1.default.cp('-R', 'fonts/*', `${constants_1.HOME}/Library/Fonts`);
exports.setupMacOS = () => utils_1.execCommand(`${path_1.default.resolve('macos/setup.sh')}`);
