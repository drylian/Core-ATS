import http from "../http";
export interface AdminActivity {
	identification: string;
	identity: string;
	type:  "user" |"authorization" | "system";
	action: string;
	path?: string;
	ip?: string;
	requested: "success" | "error";
	create_at?: string;
}

export default (type?: "user" |"authorization" | "system", id?: string): Promise<AdminActivity[]> => {
	return new Promise((resolve, reject) => {
		http.get(`/api/admin/activity${type ? `/${type}${id ? `/${id}` : ""}` : ""}`)
			.then(({ data }) => resolve(data.data))
			.catch(reject);
	});
};
