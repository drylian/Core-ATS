import { UserE } from "../../../states/admin/account";
import http from "../../http";

const getAccount = (id: string):Promise<UserE> => {
	return new Promise((resolve, reject) => {
		http.get("/api/admin/accounts/" + id)
			.then(({ data }: { data: { data: UserE } }) => {
				return resolve(data.data);
			})
			.catch(reject);
	});
};

export default getAccount;
