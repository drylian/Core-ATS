import { UserE } from "../../states/admin/account";
import http from "../http";

export default (): Promise<UserE[]> => {
	return new Promise((resolve, reject) => {
		http.get("/api/admin/accounts")
			.then(({ data }) => resolve(data.data))
			.catch(reject);
	});
};
