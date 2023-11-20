import http from "../http";

interface RegisterResponse {
  complete?: boolean;
  message?:string;
}

interface RegisterParams {
  username: string;
  password: string;
  email: string;
}

const registerUser = ({ username, password, email }: RegisterParams): Promise<RegisterResponse> => {
  return new Promise((resolve, reject) => {
    http.post("/auth/register", {
      username,
      password,
      email,
    })
      .then((response) => {
        if (!(response.data instanceof Object)) {
          return reject(new Error("Ocorreu um erro ao processar a solicitação de Registro."));
        }

        return resolve({
          complete: response.data.complete || false,
          message : response.data.message || "Desconhecido"
        });
      })
      .catch(reject);
  });
};

export default registerUser;
