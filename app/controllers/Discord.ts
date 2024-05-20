import { Client } from 'discord.js';
import { ErrType, SettingsJson } from '@/interfaces';
import storage from './Storage';
import { createClient } from './discord/DiscordJS';
import Loggings, { LoggingsMethods } from './Loggings';
/**
 * Controlador do discord, inicia e para o discord dependendo das ações
 */
class Discord {
    public client: Client
    private core: LoggingsMethods
    private errors: number
    constructor() {
        this.client = createClient()
        this.core = new Loggings("Discord Switch", "blue");
        this.errors = 0
    }
    public async automatic() {
        const config: SettingsJson = storage.get("settings")
        if (config?.discord && config?.discord?.active) {
            await this.start();
        } else {
            await this.stop();
        }
    }

    public async start() {
        const config: SettingsJson = storage.get("settings")
        if (config?.discord && config?.discord?.active) {
            if (!this.client.isReady()) this.core.info("Discord ativado, verificando se as configurações estão setadas.")
            if (config?.discord?.token && this.errors <= 3) {
                if (!this.client.isReady()) {
                    this.core.info("Configurações verificadas, tentando iniciar o discord.")
                    try {
                        await this.client.start(config?.discord?.token)
                    } catch (e) {
                        this.errors++
                        this.core.error("Erro ao tentar iniciar o discord : " + (e as ErrType).message)
                    }
                }
            }
            if (this.errors > 3) {
                this.core.warn("Ocorreu mais de 3 erros ao tentar iniciar o discord, o sistema desativou o active do discord para impedir flood da api do discord")
                this.errors = 0
                storage.set("settings", {
                    discord: {
                        active: false
                    }
                })
            }

        }
    }

    public async stop() {
        if (this.client) {
            if (this.client.isReady()) {
                this.core.info("Discord ativado, tentando desligar.")
                await this.client.destroy()
                this.core.info("Discord desligado.")
            }
        }
    }
}
const dis = new Discord();
export default dis