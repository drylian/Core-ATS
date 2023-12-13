import http from "../http";
export interface AdminActivity {
	userid: number;
	username: string | undefined;
	action: string;
	ip: string | undefined;
	create_at: Date | undefined;
}
export default (id?: string): Promise<AdminActivity[]> => {
	return new Promise((resolve, reject) => {
		http.get(`/api/admin/activity${id ? `/${id}` : ""}`)
			.then(({ data }) => resolve(data.data))
			.catch(reject);
	});
};
