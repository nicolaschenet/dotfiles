import { UserInfo } from '../../types';
import Listr from 'listr';
export declare const git: ({ firstname, lastname, email }: UserInfo) => Listr<any>;
