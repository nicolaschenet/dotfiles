"use strict";
const command_1 = require("@oclif/command");
class InstallDotfiles extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(InstallDotfiles);
        const name = flags.name || 'world';
        this.log(`hello ${name} from ./src/index.ts`);
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`);
        }
    }
}
InstallDotfiles.description = 'describe the command here';
InstallDotfiles.flags = {
    // add --version flag to show CLI version
    version: command_1.flags.version({ char: 'v' }),
    help: command_1.flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: command_1.flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: command_1.flags.boolean({ char: 'f' }),
};
InstallDotfiles.args = [{ name: 'file' }];
module.exports = InstallDotfiles;
