import http from "../http";

interface LoginResponse {
  complete?: boolean;
}

interface LoginParams {
  username: string;
  password: string;
  remember_me: boolean;
}

const loginUser = ({ username, password, remember_me }: LoginParams): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    http.post("/auth/login", {
      username,
      password,
      remember_me,
    })
      .then((response) => {
        if (!(response.data instanceof Object)) {
          return reject(new Error("Ocorreu um erro ao processar a solicitação de login."));
        }

        return resolve({
          complete: response.data.complete || false,
        });
      })
      .catch(reject);
  });
};

export default loginUser;
