import type { Action } from "easy-peasy";
import { action } from "easy-peasy";

export interface UserE {
    id?: number | null;
    username: string;
    email: string;
    lang: string | null;
    permissions: number | null;
    uuid: string;
    remember: string | null;
    suspended: boolean | null;
    suspendedReason: string | null;
}

interface AdminUserStore {
    selectedUsers: number[];

    setSelectedUsers: Action<AdminUserStore, number[]>;
    appendSelectedUser: Action<AdminUserStore, number>;
    removeSelectedUser: Action<AdminUserStore, number>;
}

const users: AdminUserStore = {
	selectedUsers: [],

	setSelectedUsers: action((state, payload) => {
		state.selectedUsers = payload;
	}),

	appendSelectedUser: action((state, payload) => {
		state.selectedUsers = state.selectedUsers.filter((id) => id !== payload).concat(payload);
	}),

	removeSelectedUser: action((state, payload) => {
		state.selectedUsers = state.selectedUsers.filter((id) => id !== payload);
	}),
};

export type { AdminUserStore };
export default users;
