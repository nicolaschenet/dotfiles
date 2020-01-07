import Listr from 'listr';
export declare const installHomebrew: () => Promise<unknown>;
export declare const installBrewFormulae: () => Listr<any>;
export declare const installBrewCasks: () => Listr<any>;
