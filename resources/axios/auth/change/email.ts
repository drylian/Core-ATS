import http from "../../http";

interface ChangeEmailResponse {
    complete?: boolean;
    email?: string;
}

interface ChangeEmailParams {
    email: string;
    password: string;
    newemail: string;
}

const changeEmail = ({ email, password, newemail }: ChangeEmailParams): Promise<ChangeEmailResponse> => {
	return new Promise((resolve, reject) => {
		http.post("/auth/change/email", {
			email,
			password,
			newemail,
		})
			.then((response) => {
				if (!(response.data instanceof Object)) {
					return reject(new Error("Ocorreu um erro ao tentar Atualizar o email."));
				}

				return resolve({
					complete: response.data.complete || false,
					email: response.data.email || undefined,
				});
			})
			.catch(reject);
	});
};

export default changeEmail;
