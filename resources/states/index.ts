import { createStore } from "easy-peasy";
import website, { WebsiteStore } from "./website";
import progress, { ProgressStore } from "./progress";
import flashes, { FlashStore } from "./flashes";
import user, { UserStore } from "./user";

export interface ApplicationStore {
    website: WebsiteStore;
    progress: ProgressStore;
    flashes: FlashStore;
    user:UserStore;
}
/**
 * States usados
 */
const state: ApplicationStore = {
	website,
	progress,
	flashes,
    user
};

export const store = createStore(state);
