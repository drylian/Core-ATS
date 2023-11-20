import http from "../../http";

interface ChangePasswordResponse {
  complete?: boolean;
}

interface ChangePasswordParams {
  username: string;
  password: string;
  newpassword: string;
}

const changePassword = ({ username, password, newpassword }: ChangePasswordParams): Promise<ChangePasswordResponse> => {
  return new Promise((resolve, reject) => {
    http.post("/auth/change/password", {
      username,
      password,
      newpassword,
    })
      .then((response) => {
        if (!(response.data instanceof Object)) {
          return reject(new Error("Ocorreu um erro ao tentar Atualizar a senha."));
        }

        return resolve({
          complete: response.data.complete || false,
        });
      })
      .catch(reject);
  });
};

export default changePassword;
