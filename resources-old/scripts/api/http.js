import axios from "axios";

const http = axios.create({
	withCredentials: true,
	timeout: 20000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

// http.interceptors.response.use(
//   (response) => {
//     if (response?.data && response?.data?.type) {
//       if (typeof error?.response?.data === 'string') {
//         setAlert('warn', error?.response?.data);
//       } else if (response?.data?.type.toLowerCase() === 'success') {
//         setAlert('success', response?.data?.message || 'Operação concluída com sucesso.');
//       } else if (response?.data?.type.toLowerCase() === 'info') {
//         setAlert('info', response?.data?.message || 'Informação recebida.');
//       } else if (response?.data?.type.toLowerCase() === 'warn') {
//         setAlert('warn', response?.data?.message || 'Aviso recebido.');
//       } else {
//         setAlert('info', response?.data?.message || 'Informação recebida.');
//       }
//     }

//     return response;
//   },
//   (error) => {
//     if (error?.response) {
//       if (typeof error?.response?.data === 'string') {
//         setAlert('error', error?.response?.data);
//       } else if (error?.response?.data && error?.response?.data?.message) {
//         setAlert('error', error?.response?.data?.message);
//       } else {
//         setAlert('error', 'Um erro desconhecido ocorreu.');
//       }

//       if (typeof error?.response?.statusText === 'string') {
//         setAlert('error', error?.response?.statusText);
//       }
//     } else {
//       setAlert('error', 'Um erro desconhecido ocorreu.');
//     }

//     return Promise.reject(error);
//   }
// );

export default http;