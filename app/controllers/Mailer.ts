import { SettingsJson } from "@/interfaces";
import * as nodemailer from "nodemailer";
import storage from "./Storage";
import Loggings from "./Loggings";

export default class Mailer {
	private transporter: nodemailer.Transporter;
	private config: SettingsJson;
	private core: Loggings;
	private conter: number;
	constructor() {
		this.config = storage.get("config");
		this.core = new Loggings("Mailer", "gray");
		this.conter = 0;
		this.transporter = nodemailer.createTransport({
			host: this.config.smtp.host,
			port: this.config.smtp.port,
			secure: this.config.smtp.secure,
			auth: {
				user: this.config.smtp.username,
				pass: this.config.smtp.password,
			},
		});
	}

	public send(to: string, subject: string, htmlContent: string): void {
		const mailOptions = {
			from: this.config.smtp.from,
			to: to,
			subject: subject,
			html: htmlContent,
		};

		this.transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return this.core.error(error);
			}
			this.core.log(
				`Novo E-mail enviado com o id ["${info.messageId}"].blue, Contando ["${this
					.conter++}"].magenta nesta iniciação.`,
			);
		});
	}
}
