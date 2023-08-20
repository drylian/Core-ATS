import Settings from "controllers/Settings";
import Loggings from "controllers/Loggings";
import { db } from "controllers/Sequelize"
const core = new Loggings("Principal", "blue")
core.sys("Iniciando processos do painel.")

async function init() {
    await db
    await db.init()

    // await import('./app/backend.mjs')

    // const { webpanel } = await import('./app/controllers/express.mjs')

    // await webpanel()
    // // core.log('Teste')
    // // core.debug('teste')
    // // core.err('teste')
    // // core.warn('teste')
    core.sys("Sistema iniciado com sucesso.")
}
Settings()
    .then(async () => {
        // Ok , settings esta configurado
        await init()
    })
    .catch((erro) => {
        core.sys("Erro ao tentar configurar o painel: " + erro.stack)
    });