import { Action, action } from "easy-peasy";
import { Socket } from "socket.io-client";

export interface SocketStore {
    socket?: Socket;
    setWebsite: Action<SocketStore, Socket>;
}

const socket: SocketStore = {
	socket: undefined,
	setWebsite: action((state, payload) => {
		state.socket = payload
	}),
};

export default socket;
