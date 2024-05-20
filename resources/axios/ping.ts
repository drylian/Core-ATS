import axios from "axios";

interface Response {
	server: number
	client: number
	discord?: number
}

const ping = (): Promise<Response> => {
	return new Promise((resolve, reject) => {
		const start = new Date().getTime();

		axios.post("/ping")
			.then((response) => {
				return resolve({
					server: response.data.ping || 0,
					discord: response.data.discord,
					client: new Date().getTime() - start
				});
			})
			.catch(reject);
	});
};

export default ping;
