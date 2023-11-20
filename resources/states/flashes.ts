import { Action, action } from "easy-peasy";
import { MessageType } from "../components/MessageAlert";

export interface FlashStore {
    items: FlashMessage[];
    addFlash: Action<FlashStore, FlashMessage>;
    clearFlashes: Action<FlashStore>;
    addError: Action<FlashStore, { message: string }>;
}

export interface FlashMessage {
    id?: string;
    key?: string;
    type: MessageType;
    title?: string;
    message: string;
}

const flashes: FlashStore = {
	items: [],

	addFlash: action((state, payload) => {
		state.items.push(payload);
	}),

	addError: action((state, payload) => {
		state.items.push({ type: "error", title: "Erro", ...payload });
	}),

	clearFlashes: action((state) => {
		state.items = [];
	}),
};

export default flashes;
