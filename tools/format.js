const childProcess = require("child_process");
const path = require("path");
require("colors");
async function main() {
	try {
		console.log("Iniciando Format...".cyan);

		console.log("Carregando Eslint...".cyan);
		childProcess.execSync("pnpm eslint", { stdio: "inherit" });
		console.log("Eslint concluído.".green);

		console.log("Formatando Backend...".cyan);
		childProcess.execSync('npx prettier --config .prettierrc.json "app/**/*.ts" --write', { stdio: "inherit" });
		console.log("Formatando do Backend concluída. \n".green);

		console.log("Formatando Frontend...".cyan);
		childProcess.execSync('npx prettier --config resources/.prettierrc.json "resources/**/*.{ts,tsx,css}" --write', { stdio: "inherit" });
		console.log("Formatando do Frontend concluída.\n".green);

		console.log("format finalizado com sucesso".green);
	} catch (error) {
		console.error("Erro durante a formatação:".red, error);
		process.exit(1);
	}
}

main();