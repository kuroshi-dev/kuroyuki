import { ping } from './ping.ts';
import { hello } from './hello.ts';
import { userinfo } from './userinfo.ts';
import { serverinfo } from './serverinfo.ts';
import { help } from './help.ts';
import { SlashCommand } from '../types/index.ts';   

export const slashCommands: SlashCommand[] = [
    ping,
    hello,
    userinfo,
    serverinfo,
    help,
];

export { ping, hello, userinfo, serverinfo, help }; 