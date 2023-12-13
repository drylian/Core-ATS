import { LogMessage } from "@/controllers/loggings/OnlyConsole";
import { Terminal } from "../Kernel";
import { question } from "@/utils";
import User from "@/models/User";
import I18alt from "@/controllers/Language";
import bcrypt from "bcrypt";
import { SystemActivity } from "@/controllers/database/MakeActivity";

export default function AccountUpdate(term: Terminal, core: ((...args: LogMessage[]) => void)) {
    term.cmd({
        name: "update:account",
        desc: "Atualiza informações da conta de usuário no painel",
        args: "[ID - id da conta do usuário]"
    }, async (args) => {
        const i18n = new I18alt();

        if (args && Number(args[0])) {
            const userRecord = await User.findOne({ where: { id: Number(args[0]) } });

            if (userRecord) {
                core("[Formulário de atualização de usuário].green-bold [Edite apenas se quiser, caso não queira mudar, basta confirmar o valor atual].bold");

                const newName = await question({
                    type: "input",
                    message: `Digite o nome do usuário (atual: ${userRecord.username}):`,
                    default: userRecord.username,
                });

                const newEmail = await question({
                    type: "input",
                    message: `Digite o email do usuário (atual: ${userRecord.email}):`,
                    default: userRecord.email,
                });

                const newLang = await question({
                    type: "list",
                    message: `Digite a idioma do usuário (atual: ${userRecord.lang}):`,
                    choices: i18n.languages,
                    default: userRecord.lang,
                });
                
                const newPermissions = await question({
                    type: "input",
                    message: `Digite a permissão do usuário em numeros de 1000 a 10000 (atual: ${userRecord.permissions}):`,
                    default: userRecord.permissions,
                });

                const newPassword = await question({
                    type: "input",
                    message: `Digite a senha do usuário (se não quiser mudar basta deixar vazio.):`,
                });
                const newStatus = await question({
                    type: "list",
                    message: `O usuário se encontra com o status (${userRecord.suspended ? "Suspenso" : "Normal"})`,
                    choices: [
                        "true",
                        "false",
                    ],
                    default:userRecord.suspended ? "true" : "true"
                });
                let newSuspendedReason
                if (JSON.parse(newStatus.toLowerCase())) {
                    newSuspendedReason = await question({
                        type: "input",
                        message: `Adicione uma descrição do por que da suspensão?:`,
                        default: "Suspenso pelo sistema interno"
                    });
                }
                const response = await question({
                    type: "list",
                    message: `Tem certeza que deseja atualizar o usuário ${userRecord.username} (${userRecord.email})?, não será possível voltar atrás após concordar`,
                    choices: [
                        "Sim",
                        "Não",
                    ],
                });
                let pass
                if (response.startsWith("Sim")) {
                    core("[Atualizando].blue-bold [Usuário].green-bold[...].bold");
                    if (newPassword) {
                        const saltRounds = 10; // You can adjust the number of salt rounds as needed
                        const salt = bcrypt.genSaltSync(saltRounds);
                        pass = bcrypt.hashSync(newPassword, salt);
                    }
                    const suspend = newSuspendedReason ? { suspended: true, suspendedReason: newSuspendedReason } : {suspended:false, suspendedReason:undefined}
                    await User.update(
                        {
                            username: newName || userRecord.username,
                            email: newEmail || userRecord.email,
                            lang: newLang || userRecord.lang,
                            permissions: Number(newPermissions) || userRecord.permissions,
                            password: (newPassword ? pass : undefined),
                            ...suspend
                        },
                        { where: { id: Number(args[0]) } }
                    );
                    await SystemActivity(`Usuário "${userRecord.username}" dono do email "${userRecord.email}" foi teve suas informações alteradas por comando do terminal interno.`);

                    core("[Usuário].green-bold [Atualizado].blue-bold [com].bold [sucesso].green-bold");
                } else {
                    core("[Atualização do usuário].red-bold [cancelada].green-bold.");
                }
            } else {
                core("[Não].red-bold [foi possível encontrar um].bold [usuário].green-bold [com o].bold [ID].green-bold [especificado].bold.");
            }
        } else {
            core("[Um].bold [ID - Número].green-bold [é necessário para especificar o usuário que será].bold [atualizado].blue-bold");
        }
    });
}
