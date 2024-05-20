import http from "../../http";
export interface ConfigData {
    port: number;
    url: string;
    title: string;
    protocol: string;
    version: string;
    smtp: boolean;
    cors: {
      allowed: string[];
      active: boolean;
    };
    lang: string;
  }
  
export default (): Promise<ConfigData> => {
	return new Promise((resolve, reject) => {
		http.get("/api/admin/settings/config")
			.then(({ data }) => resolve(data.data))
			.catch(reject);
	});
};
