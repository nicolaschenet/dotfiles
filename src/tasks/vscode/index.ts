import Listr from 'listr'

const VerboseRenderer = require('listr-verbose-renderer')

import { VSCODE_EXTENSIONS } from './constants'
import { execCommand } from '../../utils'

export const installVsCodeExtensions = () => new Listr(VSCODE_EXTENSIONS.map(extension => ({
  title: extension,
  task: () => execCommand(`code --install-extension ${extension}`),
})), { renderer: VerboseRenderer })
