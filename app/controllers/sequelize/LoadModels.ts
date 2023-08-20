import { readdirSync } from 'fs';
import Configuractions from 'controllers/settings/Default';
import { Models } from 'interfaces/Controllers';

async function LoadModels() {
    const models: Models = {};
    readdirSync(Configuractions.modelsPATH).forEach(async file => {
        const { default: Model } = await import(`${Configuractions.TSPATH.modelsPATH}/${file}`)
        models[Model] = Model
    })
    return models
}


export default LoadModels;