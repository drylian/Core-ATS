import axios from "axios";

interface RegisterResponse {
    complete?: boolean;
    message?: string;
}

interface RegisterParams {
    username: string;
    password: string;
    email: string;
    lang: string;
}

const registerUser = ({ username, password, email, lang }: RegisterParams): Promise<RegisterResponse> => {
	return new Promise((resolve, reject) => {
		axios.post("/auth/register", {
			username,
			password,
			email,
			lang,
		})
			.then((response) => {
				if (!(response.data instanceof Object)) {
					return reject(new Error("ErrorForProcessRegister"));
				}

				return resolve({
					complete: response.data.complete || false,
					message: response.data.message || null,
				});
			})
			.catch(reject);
	});
};

export default registerUser;
