/**
 * Versão dois do Viteless, com o objetivo de ler o index.html.*s ao invez de index.html
 */
import root from '@/controllers/settings/Default';
import { SettingsJson } from '@/interfaces';
import { json } from '@/utils';
import * as fs from 'fs';
import * as path from 'path';

// Diretório onde estão os arquivos .js, .css e .scss
const assetsDir = path.join(root.rootPATH, 'http/public/assets');
/**
 * @interface
 */
interface AssetFiles {
    js: string[]; // Arquivos JavaScript
    css: string[]; // Arquivos CSS
    scss: string[]; // Arquivos SCSS
    error: boolean;
}

/**
 * Obtém os arquivos .js, .css e .scss no diretório especificado.
 *
 * @returns {AssetFiles} Os arquivos encontrados.
 */
function Assetsfiles(): AssetFiles {
    const assetFiles: AssetFiles = { js: [], css: [], scss: [], error: false };

    if (fs.existsSync(assetsDir)) {
        fs.readdirSync(assetsDir).forEach((file) => {
            const extname = path.extname(file);
            if (extname === '.js') {
                assetFiles.js.push(file);
            } else if (extname === '.css') {
                assetFiles.css.push(file);
            } else if (extname === '.scss') {
                assetFiles.scss.push(file);
            }
        });
    } else {
        if (json<SettingsJson>(root.configPATH + '/settings.json').mode === 'pro') assetFiles.error = true;
    }

    return assetFiles;
}

/**
 * Gera as tags de script e link com base nos arquivos fornecidos.
 *
 * @param {AssetFiles} assets - Os arquivos de ativos.
 * @returns {Object} As tags de script e link geradas.
 */
function generateTags(assets: AssetFiles) {
    const scriptTags = assets.js
        .map((file) => `<script type="module" crossorigin src="/assets/${file}"></script>`)
        .join('\n');
    const linkTags = assets.css.map((file) => `<link rel="stylesheet" href="/assets/${file}">`).join('\n');
    const scssLinkTags = assets.scss.map((file) => `<link rel="stylesheet" href="/assets/${file}">`).join('\n');

    return { scriptTags, linkTags, scssLinkTags, error: assets.error };
}

/**
 * Função que encapsula a lógica de renderização Vite e retorna as tags geradas.
 *
 * @returns {Object} As tags de script e link geradas.
 */
export default function ViteRender() {
    // Obter a lista de arquivos .js, .css e .scss
    const assetFiles = Assetsfiles();

    // Gerar as tags de script e link
    const { scriptTags, linkTags, scssLinkTags, error } = generateTags(assetFiles);

    // Retornar os resultados
    return {
        scriptTags,
        linkTags,
        scssLinkTags,
        error,
    };
}
