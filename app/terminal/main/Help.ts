import { LogMessage } from "@/controllers/loggings/OnlyConsole";
import { Terminal } from "../Kernel";

export default function Help(term: Terminal, core: ((...args: LogMessage[]) => void)) {
    term.cmd({
        name: "help",
        desc: "Lista todos os comandos do painel"
    }, async () => {
        const commands = term.listCMDS()
        const sortedCommands = commands.sort((a, b) => a.name.localeCompare(b.name));
        core(`[Lista de comandos do painel].bold`)
        core();
        sortedCommands.map(command => {
            core(`[${command.name}].blue-bold ${command.args ? command.args + " " : ""}- [${command.desc}].bold`);
          })
    });
}
