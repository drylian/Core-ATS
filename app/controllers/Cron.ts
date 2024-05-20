import cron from 'node-cron';
import MainKernel from "@/controllers/Kernel"

export default class CronController {
    constructor() {
        // Agendando a função para ser executada a cada minuto
        const main = cron.schedule('* * * * *', () => {
            new MainKernel();
        }, {
            scheduled: true,
        });
        // Iniciando a tarefa
        main.start();
    }
}