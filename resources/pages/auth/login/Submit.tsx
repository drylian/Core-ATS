import { useNavigate } from "react-router-dom";
import login from "../../../axios/auth/login";
import { FormValues } from "./types";
import { RefObject } from "react";
import { TFunction } from "i18next";
import i18n from "../../../i18n";

const Submit = (
	errMsg: string,
	setErrMsg: React.Dispatch<React.SetStateAction<string>>,
	errRef: RefObject<HTMLInputElement>,
	t: TFunction<"react:auth", undefined>,
) => {
	const callbackUrl = new URLSearchParams(window.location.search).get("callback");

	const navigate = useNavigate();

	return async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		if (errMsg) {
			setErrMsg("");
		}
		const lang = i18n.language;
		login({
			email: values.email,
			password: values.password,
			remember_me: values.remember_me,
			lang,
		})
			.then((response) => {
				if (response.complete) {
					// Set user configurations and navigate to the home page
					if (callbackUrl) navigate(callbackUrl);
					else navigate("/");
					window.location.reload();
					return;
				}
				setSubmitting(false);
			})
			.catch((err) => {
				if (err === "ErrorForProcessLogin") {
					setErrMsg(t("ErrorForProcessLogin"));
				} else {
					setErrMsg(err.response?.data?.message || t("GeralError"));
				}

				if (errRef.current) {
					errRef.current.focus();
				}

				console.error("Erro ao iniciar registro:", err);
			});
	};
};

export default Submit;
