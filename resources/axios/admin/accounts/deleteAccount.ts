import http from "../../http";

const deleteAccount = (id: number)=> {
    return new Promise((resolve, reject) => {
        http.delete("/api/admin/accounts/" + id + "/delete")
            .then(resolve)
            .catch(reject);
    });
};

export default deleteAccount;
