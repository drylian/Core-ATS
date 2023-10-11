import http from "../http"
export default ({ username, password, email }) => {
    return new Promise((resolve, reject) => {
                http.post('/auth/register', {
                    username,
                    password,
                    email
                })
            .then((response) => {
                if (!(response.data instanceof Object)) {
                    return reject(new Error('Ocorreu um erro ao processar a solicitação de Registro.'));
                }

                return resolve({
                    complete: response.data.complete || false,
                });
            })
            .catch(reject);
    });
};