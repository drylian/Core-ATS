import http from "../../http"
export default ({ email, password, newemail }) => {
    return new Promise((resolve, reject) => {
                http.post('/auth/change/email', {
                    email,
                    password,
                    newemail
                })
            .then((response) => {
                if (!(response.data instanceof Object)) {
                    return reject(new Error('Ocorreu um erro ao tentar Atualizar o email.'));
                }

                return resolve({
                    complete: response.data.complete || false,
                    email: response.data.email || undefined,
                });
            })
            .catch(reject);
    });
};