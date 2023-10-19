const childProcess = require('child_process');

async function main() {
    try {
        // 1. Build do backend (TypeScript com tsc).
        console.log('Iniciando a compilação do backend (TypeScript)...');
        childProcess.execSync('tsc --project ./tsconfig.json && tsc-alias', { stdio: 'inherit' });
        console.log('Compilação do backend concluída.');

        // 2. Build do frontend (Vite).
        console.log('Iniciando a compilação do frontend (Vite)...');
        childProcess.execSync('vite build --emptyOutDir', { stdio: 'inherit' });
        console.log('Compilação do frontend concluída.');

        // 3. Mover a pasta ./app/http/static para ./dist/http/static.
        const sourceDirectory = './app/http/public/**/*';
        const destinationDirectory = './dist/http/public/';
        console.log(`Copiando a pasta ${sourceDirectory} para ${destinationDirectory}...`);
        childProcess.execSync('copyfiles ' + sourceDirectory + ' ' + destinationDirectory, { stdio: 'inherit' });
        console.log('Pasta pública copia com sucesso.');

        console.log('Build completada, acesse ./dist para iniciar o projeto.');
    } catch (error) {
        console.error('Erro durante a compilação:', error);
        process.exit(1);
    }
}

main();
