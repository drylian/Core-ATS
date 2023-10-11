import http from "../http"
export default ({ username, password, remember_me }) => {
    return new Promise((resolve, reject) => {
                http.post('/auth/login', {
                    username,
                    password,
                    remember_me
                })
            .then((response) => {
                if (!(response.data instanceof Object)) {
                    return reject(new Error('Ocorreu um erro ao processar a solicitação de login.'));
                }

                return resolve({
                    token: response.data.token || undefined,
                    complete: response.data.complete || false,
                    user: response.data.user || undefined,
                    expire: response.data.expire || undefined,
                    remember: response.data.remember || undefined
                });
            })
            .catch(reject);
    });
};