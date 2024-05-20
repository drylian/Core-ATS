import { EventEmitter } from 'events';
import Loggings from '../../Loggings';

interface ClientEvents {
    // Defina seus tipos de eventos aqui
    exemploEvento: (arg1: string, arg2: number) => void;
    outroEvento: (arg1: boolean) => void;
    // Adicione outros eventos conforme necessário
}

interface EventData<Key extends keyof ClientEvents> {
    name: Key;
    once?: boolean;
    run(...args: Parameters<ClientEvents[Key]>): any;
}

export class Event<Key extends keyof ClientEvents> extends EventEmitter {
    public static all: Array<EventData<keyof ClientEvents>> = [];
    public static events = new EventEmitter();;

    constructor(data: EventData<Key>) {
        super();

        const core = new Loggings('Eventos', 'green');

        core.info(`[${data.name}].blue foi registrado com [sucesso].green!`);
        Event.all.push(data);

        if (data.once) {
            this.once(data.name, (...args) => data.run(...args));
        } else {
            this.on(data.name, (...args) => data.run(...args));
        }
    }
}
