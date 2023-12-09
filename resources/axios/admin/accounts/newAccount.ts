import http from "../../http";
interface FormData {
    name: string;
    email: string;
    password: string;
    permissions: string;
    lang: string;
}

const newAccount = ({ name, email, password, permissions, lang }: FormData) => {
	return new Promise((resolve, reject) => {
		http.put("/api/admin/accounts/new", {
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
