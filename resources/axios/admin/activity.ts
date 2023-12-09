import http from "../http";
export interface AdminActivity {
    username: string | undefined;
    action: string;
    ip: string | undefined;
    create_at: Date | undefined;
}
export default (): Promise<AdminActivity[]> => {
	return new Promise((resolve, reject) => {
		http.get("/api/admin/activity")
			.then(({ data }) => resolve(data.data))
			.catch(reject);
	});
};
