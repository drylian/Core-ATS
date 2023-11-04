const childProcess = require("child_process");
const fs = require("fs");
const fss = require("fs-extra");

require("colors");
async function main() {
	try {
		console.log("Iniciando verificações...".cyan);

		if (fs.existsSync("./dist")) {
			console.log("[ Trash ] Deletando dist...".red);
			await fss.rm('./dist', { recursive: true });
		}
		if (fs.existsSync("./app/http/public")) {
			console.log("[ Trash ] Deletando public...".red);
			await fss.rm('./app/http/public', { recursive: true });
		}
		if (fs.existsSync("./build")) {
			console.log("[ Trash ] Deletando build...".red);
			await fss.rm('./build', { recursive: true });
		}
		console.log("Iniciando compiler...".cyan);

		// 1. Build do backend (TypeScript com tsc).
		console.log("Iniciando a compilação do backend (TypeScript)...".cyan);
		childProcess.execSync("tsc --project ./tsconfig.json && tsc-alias", { stdio: "inherit" });
		console.log("Compilação do backend concluída.".green);

		// 2. Build do frontend (Vite).
		console.log("Iniciando a compilação do frontend (Vite)...".cyan);
		childProcess.execSync("vite build --emptyOutDir", { stdio: "inherit" });
		console.log("Compilação do frontend concluída.".green);

		// 3. Mover a pasta ./app/http/public para ./dist/http/public.
		const sourceDirectory = "./app/http/public";
		const destinationDirectory = "./dist/http/public";
		console.log(`Copiando a pasta ${sourceDirectory} para ${destinationDirectory}...`.cyan);
		fss.copy(sourceDirectory, destinationDirectory, (err) => {
			if (err) {
				console.error('Erro ao copiar pública:', err);
			} else {
				console.log('pasta pública copiados com sucesso.');
			}
		});
		console.log("Pasta pública copia com sucesso.".green);

		// 4. Mover a pasta ./app/http/static para ./dist/http/static.
		const sourceDirectorys = "./app/http/static";
		const destinationDirectorys = "./dist/http/static";
		console.log(`Copiando a pasta ${sourceDirectorys} para ${destinationDirectorys}...`.cyan);
		fss.copy(sourceDirectorys, destinationDirectorys, (err) => {
			if (err) {
				console.error('Erro ao copiar static:', err);
			} else {
				console.log('pasta static copiados com sucesso.');
			}
		});
		console.log("Pasta static copia com sucesso.".green);

		// 5. Mover a pasta ./app/langs para ./dist/langs.
		const sourceLangsDirectory = "./app/langs";
		const destinationLangsDirectory = "./dist/langs";
		console.log(`Copiando a pasta ${sourceLangsDirectory} para ${destinationLangsDirectory}...`.cyan);
		fss.copy(sourceLangsDirectory, destinationLangsDirectory, (err) => {
			if (err) {
				console.error('Erro ao copiar pública:', err);
			} else {
				console.log('langs copiados com sucesso.');
			}
		});

		console.log("Iniciando Limpeza dos arquivos.".green);

		console.log("Pasta de traduções copiada com sucesso.".green);
		console.log("Limpeza completa. Buildado com Sucesso".green);
	} catch (error) {
		console.error("Erro durante a compilação:".red, error);
		process.exit(1);
	}
}

main();
