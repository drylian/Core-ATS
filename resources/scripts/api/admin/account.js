import http from "../http"
export default () => {
    return new Promise((resolve, reject) => {
            http.get('/application/admin/account')
            .then((response) => {
                return resolve(response.data);
            })
            .catch(reject);
    });
};