import http from "../../http";

const deleteToken = (id: number) => {
    return new Promise((resolve, reject) => {
        http.delete("/api/admin/tokens/" + id + "/delete")
            .then(resolve)
            .catch(reject);
    });
};

export default deleteToken;
