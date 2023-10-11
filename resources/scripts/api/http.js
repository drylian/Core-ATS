import axios from "axios";
import { getCookie, setCookie } from "../components/CookieController";
import { delItem, getItem } from "../components/Storage";

const http = axios.create({
	withCredentials: true,
	timeout: 20000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

http.interceptors.request.use(async (config) => {
	const token = getCookie("alternightuser");
	if (token) {
		config.headers.alternightuser = `Bearer ${token}`;
	} else {
		/**
		 * Se não existir mais cookie verificar se tem Remember token
		 */
		const remember = getItem("remember_me");
		if (remember) {
			await requestNewAccessTokenconfig(config, remember)
		}
	}
	return config;
});

/**
 * Função para requisitar o novo token de acesso
 * @param {*} config 
 * @param {*} remember 
 * @returns 
 */
async function requestNewAccessTokenconfig(config, remember) {
	try {
		const response = await axios.post("/auth/refresh/token", { remember_token: remember });
		console.log(response.data)
		if (response.data && response.data.complete) {
			setCookie("alternightuser", response.data.token, response.data.expire)
			config.headers.alternightuser = `Bearer ${response.data.token}`;
			return;
		} else {
			delItem("remember_me");
			console.error("Erro ao solicitar um novo token de acesso");
		}
	} catch (error) {
		delItem("remember_me");
		console.error("Erro ao solicitar um novo token de acesso:", error);
	}
}

export default http;