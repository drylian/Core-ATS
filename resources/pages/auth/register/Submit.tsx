import { useNavigate } from "react-router-dom";
import register from "../../../axios/auth/register";
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
	const navigate = useNavigate();

	return async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		if (errMsg) {
			setErrMsg("");
		}
		const lang = i18n.language;

		register({ username: values.username, email: values.email, password: values.password, lang })
			.then((response) => {
				if (response.complete) {
					// Registration successful, redirect to login page or another appropriate page
					navigate("/auth/login");
				} else {
					setErrMsg(response.message || t("ErrorForProcessRegister"));
				}
				setSubmitting(false);
			})
			.catch((err) => {
				if (err === "ErrorForProcessRegister") {
					setErrMsg(t("ErrorForProcessRegister"));
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
