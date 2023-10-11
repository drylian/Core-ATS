import express, { Application } from "express";
import configuractions from "controllers/settings/Default";
import { json } from "utils/Json";
import Loggings from "controllers/Loggings";
const core = new Loggings("Express", "cyan");
/**
 * 
 *  Vite express Resumido
 * 
 * @param app Express Application
 */
const app = express()

const config = json(configuractions.configPATH + "/settings.json")
async function init() {
  core.log("React iniciado em modo [desenvolvedor].blue.");
  const { createServer } = await import("vite")
  const vite = await createServer({
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);
}
try {
  if (config.mode !== 'production') {
    init().then(() => { core.log("[Vite Dev].blue iniciado com [sucesso].green."); })
  } else {
    core.log("React iniciado em modo [produção].blue.");
    app.use(express.static('public'));
  }
} catch (err: any) {
  core.error("Erro obtido ao tentar carregar o React: " + err.stack)
}

export { app }