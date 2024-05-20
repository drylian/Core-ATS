import { Configurations } from "@/controllers/configurations/Configurations";
import configuractions from "@/controllers/settings/Default";
import path from "path";
import { glob } from "glob";
export default class CoreSettings {
    private settings: { [key: string]: string | number | object | boolean }[]
    constructor() {

    }
    async start() {
        const CoreDIR = path.join(configuractions.rootPATH)

        const paths = await glob([
            'controllers/configs/**/*.{ts,js}',
        ], { cwd: CoreDIR })
        for (const pather of paths) await import(`./${pather.slice(20)}`)

    }
}