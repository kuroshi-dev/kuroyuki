import { ping } from './ping.ts';
import { hello } from './hello.ts';
import { userinfo } from './userinfo.ts';
import { shutdown } from './shutdown.ts';
import { restart } from './restart.ts';
import { serverinfo } from './serverinfo.ts';
import { Command } from '../types/index.ts';
import { command } from './commands.ts';

export const commands: Map<string, Command> = new Map([
    [ping.name, ping],
    [hello.name, hello],
    [userinfo.name, userinfo],
    [shutdown.name, shutdown],
    [restart.name, restart],
    [serverinfo.name, serverinfo],
    [command.name, command],
]);

export { ping, hello, userinfo, serverinfo, shutdown, restart, command }; 