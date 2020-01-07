import Listr from 'listr'

import { YARN_PACKAGES } from './constants'

import { execCommand } from '../../utils'

export const installYarnPackages = () => new Listr(YARN_PACKAGES.map(packageName => ({
  title: packageName,
  task: () => execCommand(`yarn global add ${packageName}`),
})))
