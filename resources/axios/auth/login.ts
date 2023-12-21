import axios from "axios";

interface LoginResponse {
	complete?: boolean;
}

interface LoginParams {
	email: string;
	password: string;
	remember_me: boolean;
	lang: string;
}

const loginUser = ({ email, password, remember_me, lang }: LoginParams): Promise<LoginResponse> => {
	return new Promise((resolve, reject) => {
		axios.post("/auth/login", {
			email,
			password,
			remember_me,
			lang,
		})
			.then((response) => {
				if (!(response.data instanceof Object)) {
					return reject("ErrorForProcessLogin");
				}

				return resolve({
					complete: response.data.complete || false,
				});
			})
			.catch(reject);
	});
};

export default loginUser;
