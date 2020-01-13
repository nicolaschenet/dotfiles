"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const shelljs_1 = tslib_1.__importDefault(require("shelljs"));
exports.execCommand = (cmd) => new Promise(resolve => shelljs_1.default.exec(cmd, {
    silent: true,
    async: true,
    shell: '/bin/zsh',
}, () => resolve()));
