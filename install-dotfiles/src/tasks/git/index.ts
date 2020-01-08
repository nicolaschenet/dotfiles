
import { execCommand } from '../../utils'
import { UserInfo } from '../../types'
import Listr from 'listr'

export const git = ({ firstname, lastname, email }: UserInfo) => new Listr([{
  title: 'Setting user name',
  task: () => execCommand(`git config --global user.name "${firstname} ${lastname}"`),
}, {
  title: 'Setting user email',
  task: () => execCommand(`git config --global user.email "${email}"`),
}])
