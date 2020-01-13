import Listr from 'listr';
export declare const installZshSyntaxHighlighting: (_ctx: any, task: Listr.ListrTaskWrapper<any>) => Promise<unknown>;
export declare const installP10K: (_ctx: any, task: Listr.ListrTaskWrapper<any>) => Promise<unknown>;
export declare const installOhMyZsh: (_ctx: any, task: Listr.ListrTaskWrapper<any>) => Promise<unknown>;
export declare const installZshPlugins: () => Listr<any>;
