import Listr from 'listr'

const VerboseRenderer = require('listr-verbose-renderer')

import { YARN_PACKAGES } from './constants'

import { execCommand } from '../../utils'

export const installYarnPackages = () => new Listr(YARN_PACKAGES.map(packageName => ({
  title: packageName,
  task: () => execCommand(`yarn global add ${packageName}`),
})), { renderer: VerboseRenderer })
