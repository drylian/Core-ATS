import http from "../../http";
export interface MailData {
    active: boolean;
    host: string;
    port: number;
    secure: boolean;
    username: string;
    from: string;
}

export default (): Promise<MailData> => {
    return new Promise((resolve, reject) => {
        http.get("/api/admin/settings/mail")
            .then(({ data }) => resolve(data.data))
            .catch(reject);
    });
};
