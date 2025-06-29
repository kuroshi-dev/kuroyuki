import { ping } from './ping.ts';
import { hello } from './hello.ts';
import { userinfo } from './userinfo.ts';
import { serverinfo } from './serverinfo.ts';
import { help } from './help.ts';
import { ISlashCommand } from '../types/index.ts';   

export const slashCommands: ISlashCommand[] = [
    help,
    ping,
    hello,
    serverinfo,
    userinfo,
];

export { ping, hello, userinfo, serverinfo, help }; 