import http from "../../http";
import { TokenData } from "../tokens";

const getToken = (id: string):Promise<TokenData> => {
	return new Promise((resolve, reject) => {
		http.get("/api/admin/tokens/" + id)
			.then(({ data }: { data: { data: TokenData } }) => {
				return resolve(data.data);
			})
			.catch(reject);
	});
};

export default getToken;
