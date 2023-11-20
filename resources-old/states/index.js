import { createStore } from "easy-peasy";
import user from "./user";
import website from "./website";

/**
 * States usados
 */
const state = {
	user,
	website
};

export const store = createStore(state);
