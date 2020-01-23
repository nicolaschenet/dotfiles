import shell from 'shelljs'

export const execCommand = (cmd: string) => new Promise(resolve =>
  shell.exec(cmd, {
    silent: false,
    async: true,
    shell: '/bin/zsh',
  }, () => resolve())
)
