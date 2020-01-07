import { Command, flags } from '@oclif/command'
declare class InstallDotfiles extends Command {
    static description: string;

    static flags: {
        version: import('@oclif/parser/lib/flags').IBooleanFlag<void>;
        help: import('@oclif/parser/lib/flags').IBooleanFlag<void>;
        name: flags.IOptionFlag<string | undefined>;
        force: import('@oclif/parser/lib/flags').IBooleanFlag<boolean>;
    };

    static args: {
        name: string;
    }[];

    run(): Promise<void>;
}
export = InstallDotfiles;
