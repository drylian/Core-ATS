import http from "../../http";
interface FormData {
	memo?: string;
	permissions: string;
	lang: string;
}

const newAccount = ({ memo, permissions, lang }: FormData): Promise<{token: string}> => {
	return new Promise((resolve, reject) => {
		http.put("/api/admin/tokens/new", {
			memo,
			permissions,
			lang,
		})
			.then((response) => {
				return resolve(response.data.data);
			})
			.catch(reject);
	});
};

export default newAccount;
