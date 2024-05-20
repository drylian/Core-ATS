import { io, Socket } from "socket.io-client"
import { store } from "./states";

export function SocketConnect(token?: string): Socket {
    const website = store.getState().website.data
    const URL = website?.url ? website.url + ":" + website.port : "";
    const socket = io(URL, {
        auth: {
            authorization: token,
        },
        autoConnect: true,
    });
    return socket as Socket
}

export default SocketConnect