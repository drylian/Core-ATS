import http from "../../http"
export default ({ username, password, newpassword }) => {
    return new Promise((resolve, reject) => {
                http.post('/auth/change/password', {
                    username,
                    password,
                    newpassword
                })
            .then((response) => {
                if (!(response.data instanceof Object)) {
                    return reject(new Error('Ocorreu um erro ao tentar Atualizar a senha.'));
                }

                return resolve({
                    complete: response.data.complete || false,
                });
            })
            .catch(reject);
    });
};