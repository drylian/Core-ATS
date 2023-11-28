import { Action, action } from "easy-peasy";

export interface UserData {
    username: string;
    email: string;
    lang: string | null;
    permissions: number | null;
    uuid: string;
    remember: string | null;
    suspended: boolean | null;
    suspendedReason: string | null;
}

export interface UserStore {
    data?: UserData;
    setUserData: Action<UserStore, UserData>;
    updateUserData: Action<UserStore, Partial<UserData>>;
}

const user: UserStore = {
	data: undefined,
	setUserData: action((state, payload) => {
		state.data = payload;
	}),

	updateUserData: action((state, payload) => {
		// @ts-expect-error limitation of Typescript, can't do much about that currently unfortunately.
		state.data = { ...state.data, ...payload };
	}),
};

export default user;
