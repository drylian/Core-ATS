import http from "../http";
export interface AppConfig {
    users: number;
    tokens: number;
    modetype: string;
    cors: boolean;
    smtp: boolean;
    version: string;
}
export default (): Promise<AppConfig> => {
	return new Promise((resolve, reject) => {
		http.get("/api/admin/application")
			.then(({ data }) => resolve(data.data))
			.catch(reject);
	});
};
