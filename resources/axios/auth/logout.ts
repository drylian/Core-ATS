import http from "../http";

interface Response {
    complete?: boolean;
    message?: string;
}

const logout = (): Promise<Response> => {
	return new Promise((resolve, reject) => {
		http.post("/auth/logout")
			.then((response) => {
				return resolve({
					complete: response.data.complete || false,
				});
			})
			.catch(reject);
	});
};

export default logout;
