import I18alt from "../Language";
import MailMaker from "./Maker";

type Register = {
    user: string;
    lang: string;
};
export default function RegisterMail(params: Register) {
	const i18n = new I18alt(params.lang);
	const maker = new MailMaker(params.lang || "pt-BR");
	maker.title(i18n.t("mail.ThanyouForRegistration"), "aquamarine");
	maker.user(params.user);
	maker.message(i18n.t("mail.ThankYouForJoin"));
	maker.message(i18n.t("mail.HelpAndQuestions"));
	return maker.code;
}
