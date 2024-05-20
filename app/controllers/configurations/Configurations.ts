import { Collection } from "@/utils"
import Loggings from "@/controllers/Loggings";

export type ConfigurationType = {
    key: string;
    type: "number" | "string" | "boolean" | "object" | "string[]" | "number[]" | "object[]";
    defaults: number | string | boolean | object;
    description: string;
    internal?: boolean;
}
export class Configurations {
    public static all = new Collection<string, ConfigurationType>()
    constructor(public data: ConfigurationType[]) {
        const core = new Loggings("Configurações", "cyan")
        for (const config of data) {
            core.debug(`[${config.key}].blue foi registrado com [sucesso].green!`)
            Configurations.all.set(config.key, config)
        }
    }
}