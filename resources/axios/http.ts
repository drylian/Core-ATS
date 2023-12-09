import axios, { AxiosInstance } from "axios";
import { store } from "../states";
/* eslint-disable  @typescript-eslint/no-explicit-any */
function checkCookie(cookieName: string) {
	const cookies = document.cookie.split(";");
	for (const cookie of cookies) {
		const [name] = cookie.trim().split("=");
		if (name === cookieName) {
			return true;
		}
	}
	return false;
}

const http: AxiosInstance = axios.create({
	withCredentials: true,
	timeout: 20000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

http.interceptors.request.use(
	(config) => {
		store.getActions().progress.startContinuous();
		return config;
	},
	(error) => {
		return error;
	},
);

http.interceptors.response.use(
	(resp) => {
		store.getActions().progress.setComplete();
		if (resp.data.type && resp.data.message) {
			if (resp.data.type)
				store.getActions().flashes.addFlash({ type: resp.data.type, message: resp.data.message });
			else store.getActions().flashes.addFlash({ type: "info", message: resp.data.message });
		}
		return resp;
	},
	(error) => {
		store.getActions().progress.setComplete();

		if (error.response.data.type)
			store.getActions().flashes.addFlash({ type: error.response.data.type, message: httpErrorToHuman(error) });
		else {
			if (checkCookie("X-Application-Access")) {
				store.getActions().flashes.addError({ message: httpErrorToHuman(error) });
			} else {
				store.getActions().flashes.addFlash({ type: "warning", message: "Session Expired Please Reload" });
			}
		}
		throw error;
	},
);

export default http;

/**
 * Converts an error into a human readable response. Mostly just a generic helper to
 * make sure we display the message from the server back to the user if we can.
 */
export function httpErrorToHuman(error: any): string {
	if (error.response && error.response.data) {
		let { data } = error.response;

		// Some non-JSON requests can still return the error as a JSON block. In those cases, attempt
		// to parse it into JSON so we can display an actual error.
		if (typeof data === "string") {
			try {
				data = JSON.parse(data);
			} catch (e) {
				// do nothing, bad json
			}
		}

		if (data.errors && data.errors[0] && data.errors[0].detail) {
			return data.errors[0].detail;
		}

		// Errors from wings directory, mostly just for file uploads.
		if (data.error && typeof data.error === "string") {
			return data.error;
		}
	}

	return error.message;
}
