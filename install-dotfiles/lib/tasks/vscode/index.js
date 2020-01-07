"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const listr_1 = tslib_1.__importDefault(require("listr"));
const constants_1 = require("./constants");
const utils_1 = require("../../utils");
exports.installVsCodeExtensions = () => new listr_1.default(constants_1.VSCODE_EXTENSIONS.map(extension => ({
    title: extension,
    task: () => utils_1.execCommand(`code --install-extension ${extension}`),
})));
