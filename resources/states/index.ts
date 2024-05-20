import { createStore } from "easy-peasy";
import website, { WebsiteStore } from "./website";
import progress, { ProgressStore } from "./progress";
import flashes, { FlashStore } from "./flashes";
import user, { UserStore } from "./user";
import socket, { SocketStore } from "./socket";

export interface ApplicationStore {
    website: WebsiteStore;
    progress: ProgressStore;
    flashes: FlashStore;
    user: UserStore;
    socket: SocketStore
}
/**
 * States usados
 */
const state: ApplicationStore = {
    website,
    progress,
    flashes,
    user,
    socket,
};

export const store = createStore(state);
