import http from "../http";
interface User {
    id: number;
    username: string;
    email: string;
}

export default (): Promise<User[]> => {
	return new Promise((resolve, reject) => {
		http.get("/api/admin/account")
			.then(({ data }) => resolve(data))
			.catch(reject);
	});
};
