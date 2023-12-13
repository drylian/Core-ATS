import { LogMessage } from "@/controllers/loggings/OnlyConsole";
import { Terminal } from "../Kernel";
import { genv5, question } from "@/utils";
import User from "@/models/User";
import I18alt from "@/controllers/Language";
import bcrypt from "bcrypt";
import { SystemActivity } from "@/controllers/database/MakeActivity";

export default function AccountCreate(term: Terminal, core: ((...args: LogMessage[]) => void)) {
    term.cmd({
        name: "create:account",
        desc: "Cria uma nova conta de usuário no painel",
    }, async () => {
        const i18n = new I18alt();

        const newName = await question({
            type: "input",
            message: `Digite o nome do usuário:`,
        });

        const newEmail = await question({
            type: "input",
            message: `Digite o email do usuário:`,
        });

        const newLang = await question({
            type: "list",
            message: `Digite o idioma do usuário:`,
            choices: i18n.languages,
        });

        const newPermissions = await question({
            type: "input",
            message: `Digite a permissão do usuário em números de 1000 a 10000:`,
        });

        const newPassword = await question({
            type: "input",
            message: `Digite a senha do usuário:`,
        });
        const response = await question({
            type: "list",
            message: `Tem certeza que deseja criar o usuário ${newName} (${newEmail})?, não será possível voltar atrás após concordar`,
            choices: [
                "Sim",
                "Não",
            ],
        });

        if (response.startsWith("Sim")) {
            core("[Criando].blue-bold [Novo Usuário].green-bold[...].bold");

            const saltRounds = 10; // You can adjust the number of salt rounds as needed
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(newPassword, salt);


            const data = await User.create({
                username: newName,
                email: newEmail,
                uuid: genv5(newEmail, "users"),
                lang: newLang,
                permissions: Number(newPermissions),
                password: hashedPassword,
            });

            await SystemActivity(`Novo usuário "${newName}" dono do email "${newEmail}" foi criado por comando do terminal interno.`);

            core(`[Novo Usuário].green-bold [com o ].bold [ID: ${data.id}].blue-bold [foi criado].bold [com].bold [sucesso].green-bold`);
        } else {
            core("[Criação do usuário].red-bold [cancelada].green-bold.");
        }
    });
}
