import http from "../../http";
interface FormData {
    name: string;
    email: string;
    password: string;
    permissions: number;
    lang: string;
}

const newAccount = ({ name, email, password, permissions, lang }: FormData, id: string) => {
	return new Promise((resolve, reject) => {
		http.put(`/api/admin/accounts/${id}/edit`, {
			username: name,
			email,
			password,
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
