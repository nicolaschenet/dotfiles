"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const listr_1 = tslib_1.__importDefault(require("listr"));
exports.git = ({ gitUserEmail, gitUserName }) => new listr_1.default([{
        title: 'Setting user name',
        task: () => utils_1.execCommand(`git config --global user.name "${gitUserName}"`),
    }, {
        title: 'Setting user email',
        task: () => utils_1.execCommand(`git config --global user.email "${gitUserEmail}"`),
    }]);
