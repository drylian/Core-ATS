import { LogMessage } from "@/controllers/loggings/OnlyConsole";
import { Terminal } from "../Kernel";
import { question } from "@/utils";
import User from "@/models/User";
import { SystemActivity } from "@/controllers/database/MakeActivity";

export default function AccountDelete(term: Terminal, core: ((...args: LogMessage[]) => void)) {
    term.cmd({
        name: "delete:account",
        desc: "Deleta a conta de usuário do painel",
        args: "[ID - id da conta do usuário]"
    }, async (args) => {
        if (args && Number(args[0])) {
            const userRecord = await User.findOne({ where: { id: Number(args[0]) } });
            if (userRecord) {
                const response = await question({
                    type: "list",
                    message: `Tem certeza que deseja deletar o usuário ${userRecord.username} (${userRecord.email})?,não será possivel voltar atrás após concordar`,
                    choices: [
                        "Sim",
                        "Não",
                    ],
                });
                if (response.startsWith("Sim")) {
                    core("[Deletando].red-bold [Usuário].blue-bold[...].bold")
                    await User.destroy({ where: { id: Number(args[0]) } });
                    await SystemActivity(`Usuário "${userRecord.username}" dono do email "${userRecord.email}" foi deletado por comando do terminal interno.`);

                    core("[Usuário].blue-bold [Deletado].red-bold [com].bold [sucesso].green-bold")
                } else {
                    core("[Deletar usuário].red-bold [cancelado].green-bold.")
                }
            } else {
                core("[Não].red-bold [foi possivel encontrar um].bold [uuário].green-bold [com o].bold [ID].green-bold [expecificado].bold.")
            }
        } else {
            core("[Um].bold [ID - Numero].green-bold [é necessario para expecificar o usuário que irá ser].bold [deletado].red-bold")
        }
    });
}
