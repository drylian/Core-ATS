import http from "../http";
export interface TokenData {
	id: number | null;
	token: string;
	permissions: number | null;
	uuid: string;
	lang: string;
	memo: string;
}
export default (): Promise<TokenData[]> => {
	return new Promise((resolve, reject) => {
		http.get("/api/admin/tokens")
			.then(({ data }) => resolve(data.data))
			.catch(reject);
	});
};
