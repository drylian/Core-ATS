import * as readline from 'readline';
import Help from './main/Help';
import { Message, WhiteColors } from '@/controllers/loggings/OnlyConsole';
import { LogMessage } from '@/controllers/Loggings';
import { json } from '@/utils';
import AccountDelete from './account/AccountDelete';
import AccountUpdate from './account/AccountUpdate';
import AccountCreate from './account/AccountCreate';

interface Pct {
  dependencies: {
    [key: string]: string;
  }
  devDependencies: {
    [key: string]: string;
  }
  version: string;
}
export interface Command {
  name: string;
  desc: string;
  args?: string;
}
const core = (...args: LogMessage[]) => Message(args);

class KernelTerminal {
  private rl: readline.Interface;
  private commands: Record<string, (args: string[]) => Promise<void>> = {};
  public commandparams: Command[] = [];


  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
  public listCMDS() {
    return this.commandparams
  }
  public cmd(command: Command, handler: (args?: string[]) => Promise<void>) {
    // Registra o comando e seu manipulador
    this.commandparams.push(command)
    this.commands[command.name] = handler;
  }
  public timer() {
    const uptimeInSeconds = process.uptime();
    const days = Math.floor(uptimeInSeconds / 86400);
    const hours = Math.floor(uptimeInSeconds / 3600) % 24;
    const minutes = Math.floor(uptimeInSeconds / 60) % 60;
    const seconds = Math.floor(uptimeInSeconds) % 60;

    const processUptime = `${days > 0 ? days + "d " : ""}${hours > 0 ? hours + "h " : ""}${minutes > 0 ? minutes + "m " : ""
      }${seconds > 0 ? seconds + "s " : "0s"}`;

    return processUptime
  }
  public start() {
    const pct = json<Pct>("package.json")
    console.clear()
    core("")
    core("[░█▀▀].green [░█▀█].magenta [░█▀▄].red [░█▀▀].yellow      [░█▀█ ░▀█▀ ░█▀▀].blue")
    core("[░█  ].green [░█░█].magenta [░█▀▄].red [░█▀▀].yellow  ▄▄▄ [░█▀█  ░█░ ░▀▀█].blue")
    core("[░▀▀▀].green [░▀▀▀].magenta [░▀░▀].red [░▀▀▀].yellow      [░▀░▀  ░▀░ ░▀▀▀].blue")
    core("")
    core("[Versão do].bold [Core-ATS].blue-bold[:].bold " + `[${pct.version ? `[${pct.version}].green-bold` : "Development"}].blue-bold`)
    core("[Uptime de iniciação:].bold " + `[${this.timer()}].blue-bold`)
    core("")
    core("----------------------------------------------------------------".bold)
    core("                    [Principais  dependencias].bold                    ")
    core("----------------------------------------------------------------".bold)
    core("[Controlador Backend].bold [Express].green-bold [:].bold " + `[${pct.dependencies.express}].blue-bold`)
    core("[Controlador Frontend].bold [Vite].green-bold [:].bold " + `[${pct.dependencies["vite"]}].blue-bold`)
    core("[Socket.io-Server].green-bold [:].bold " + `[${pct.dependencies["socket.io"]}].blue-bold`)
    core("[Socket.io-Client].green-bold [:].bold " + `[${pct.devDependencies["socket.io-client"]}].blue-bold`)
    core("[React].green-bold [:].bold " + `[${pct.devDependencies["react"]}].blue-bold`)
    core("----------------------------------------------------------------".bold)
    core("[Use].bold [help].blue-bold [para ver quais comandos da para usar no terminal].bold")
    core("----------------------------------------------------------------".bold)
    this.rl.question(WhiteColors(["[Digite um].bold-blue [comando].green-bold ([exemplo].bold [help].magenta-bold)[:].bold"]), this.processUserInput.bind(this));

    this.rl.on('close', () => {
      console.clear();
      core("")
      core("[░█▀▀].green [░█▀█].magenta [░█▀▄].red [░█▀▀].yellow      [░█▀█ ░▀█▀ ░█▀▀].blue")
      core("[░█  ].green [░█░█].magenta [░█▀▄].red [░█▀▀].yellow  ▄▄▄ [░█▀█  ░█░ ░▀▀█].blue")
      core("[░▀▀▀].green [░▀▀▀].magenta [░▀░▀].red [░▀▀▀].yellow      [░▀░▀  ░▀░ ░▀▀▀].blue")
      core("")
      core("[Uptime de finalização:].bold " + `[${this.timer()}].blue-bold`)
      core("")
      core("----------------------------------------------------------------".bold)
      core("[Finalizando o ].bold[Painel...].blue-bold [Até mais].bold")
      core("----------------------------------------------------------------".bold)
      process.exit(0);
    });
  }

  private async processUserInput(input: string) {
    const [command, ...args] = input.trim().split(' ');

    if (this.commands[command]) {
      core()
      core("----------------------------------------------------------------".bold)
      core(`[Comando].bold [${command}].blue-bold [do painel executado...].bold`)
      core("----------------------------------------------------------------".bold)
      core()
      this.rl.pause();
      await this.commands[command](args).then(() =>{
        core()
        core("----------------------------------------------------------------".bold)
      });
    } else {
      const similarCommands = Object.values(this.commandparams)
        .filter(cmd => cmd.name.includes(command))

      if (similarCommands.length > 0) {
        core(`[Comando não encontrado.].red-bold`);
        core();
        core(`[Você quis dizer?].bold [possiveis comandos disponiveis].bold-green`);
        similarCommands.map(command => {
          core();
          core(`[${command.name}].blue-bold ${command.args ? command.args + " " : ""}- [${command.desc}].bold`);
        })
        core();
      } else {
        core();
        core(`[Comando não encontrado.].red-bold`);
        core();
        core(`[Tente usar].bold [help].blue-bold [para ver os comandos do painel].bold`);

      }
    }

    // Pergunta novamente para o próximo comando
    this.rl.resume();
    this.rl.question(WhiteColors(["[Digite um].bold-blue [comando].green-bold ([exemplo].bold [help].magenta-bold)[:].bold"]), this.processUserInput.bind(this));
  }
}
export type Terminal = InstanceType<typeof KernelTerminal>;

const terminal = new KernelTerminal();

Help(terminal, core)
AccountDelete(terminal, core)
AccountUpdate(terminal, core)
AccountCreate(terminal, core)

export default terminal;
