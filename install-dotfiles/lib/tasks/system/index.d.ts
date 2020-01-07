import Listr from 'listr';
import shell from 'shelljs';
export declare const installCliTools: (_ctx: any, task: Listr.ListrTaskWrapper<any>) => Promise<unknown>;
export declare const installFonts: () => shell.ShellString;
export declare const setupMacOS: () => Promise<unknown>;
