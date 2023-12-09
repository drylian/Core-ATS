import { createContextStore } from "easy-peasy";
import type { AdminUserStore } from "./account";
import users from "./account";

interface AdminStore {
    users: AdminUserStore;
}

export const AdminContext = createContextStore<AdminStore>({
	users,
});
