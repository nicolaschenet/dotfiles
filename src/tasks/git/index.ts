
import { execCommand } from '../../utils'
import { UserInfo } from '../../types'
import Listr from 'listr'

const VerboseRenderer = require('listr-verbose-renderer')

export const git = ({ gitUserEmail, gitUserName }: UserInfo) => new Listr([{
  title: 'Setting user name',
  task: () => execCommand(`git config --global user.name "${gitUserName}"`),
}, {
  title: 'Setting user email',
  task: () => execCommand(`git config --global user.email "${gitUserEmail}"`),
}], {
  renderer: VerboseRenderer,
})
