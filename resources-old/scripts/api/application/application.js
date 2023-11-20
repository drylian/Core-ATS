import http from "../http";
export default () => {
	return new Promise((resolve, reject) => {
		http.get("/api/application")
			.then((response) => {
				return resolve(response.data);
			})
			.catch(reject);
	});
};