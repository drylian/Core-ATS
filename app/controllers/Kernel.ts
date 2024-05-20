import dis from "./Discord";

/**
 * Kernel é a area conhecida como Full-Dinamic Content, usando cron,
 * a cada 1 minuto essa função é executada para manter o painel estavel
 * e executar suas funções em segundo plano, evitando possiveis problemas 
 * e ao mesmo tempo permitindo que o painel, até certo nivel
 * se auto gerencie.
 */
export default class MainKernel {
    constructor(){
        this.discord()
    }
    async discord() {
        await dis.automatic();
    }
}