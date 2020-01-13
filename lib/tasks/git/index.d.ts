import { UserInfo } from '../../types';
import Listr from 'listr';
export declare const git: ({ gitUserEmail, gitUserName }: UserInfo) => Listr<any>;
