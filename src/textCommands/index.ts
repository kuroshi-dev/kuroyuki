import { ping } from './ping.ts';
import { hello } from './hello.ts';
import { userinfo } from './userinfo.ts';
import { shutdown } from './shutdown.ts';
import { restart } from './restart.ts';
import { redeploy } from './redeploy.ts';
import { serverinfo } from './serverinfo.ts';
import { ITextCommand } from '../types/index.ts';
import { commandlist } from './commandlist.ts';

export const commands: Map<string, ITextCommand> = new Map([
    [ping.name, ping],
    [hello.name, hello],
    [userinfo.name, userinfo],
    [shutdown.name, shutdown],
    [restart.name, restart],
    [redeploy.name, redeploy],
    [serverinfo.name, serverinfo],
    [commandlist.name, commandlist],
]);

export { ping, hello, userinfo, serverinfo, shutdown, restart, redeploy, commandlist }; 