import I18alt from "@/controllers/Language";
import Loggings, { LoggingsMethods } from "@/controllers/Loggings";
import storage from "@/controllers/Storage";
import { NextFunction, Request, Response } from "express";

/**
 * Middleware para o Connections, um controlador de requests, limitando conexões indesejadas
 */
type Ips = {
    [key: string]: {
        requests: number;
        warn: number;
        blocked: boolean;
        history: {
            [key: string]: string;
        };
    };
};

export function Connections(core: LoggingsMethods) {
	let callCount = 0;
	let extend = 0;
	const banned = new Loggings("Banidos", "red");
	const BlockedList = [
		".php",
		".env",
		".git/config",
		".PHP",
		"ENV=",
		".asp",
		".aspx",
		".jsp",
		".xml",
		".htaccess",
		".bak",
		".swp",
		".swo",
		".sql",
		".csv",
		".sqlite",
		".db",
		"/wp-admin",
		"/wp-login.php",
		"/wp-content",
		"/wp-includes",
		"/phpmyadmin",
		"/myadmin",
		"/manager",
		"?cmd=",
		"?exec=",
		"?shell=",
		"?download=",
		"?upload=",
		"?php=",
		"?eval=",
		"?sql=",
		"config.php",
		"database.php",
		"settings.php",
		"web.config",
		"phpinfo.php",
		"info.php",
		"phpMyAdmin.config.php",
		"wp-config.php",
		"configuration.php",
		"php.ini",
		"passwd",
		"shadow",
		"ssh_config",
		"known_hosts",
		"authorized_keys",
		"id_rsa",
		"id_dsa",
		"secret_key",
		"private.key",
		"wp-config.bak",
		"wp-config.old",
		"wp-config.zip",
		"wp-config.bak.php",
		"wp-config.old.php",
		"wp-config.zip.php",
	];

	return (req: Request, res: Response, next: NextFunction) => {
		const ip: Ips = storage.get("Accesslist") ?? {};
		const i18n = new I18alt();
		function CheckerIps(message: string, blockedRoute?: boolean) {
			if (req.access.ip !== undefined) {
				if (ip[req.access.ip?.toString()])
					storage.set(
						"Accesslist",
						{ [req.access.ip?.toString()]: { requests: (ip[req.access.ip?.toString()].requests += 1) } },
						true,
					);
				if (blockedRoute) {
					if (ip[req.access.ip?.toString()]) {
						const data = (ip[req.access.ip?.toString()].warn += 1);
						const timestamp = Date.now();
						storage.set(
							"Accesslist",
							{
								[req.access.ip?.toString()]: {
									warn: data,
									history: { [timestamp.toString()]: req.originalUrl },
								},
							},
							true,
						);
					} else {
						storage.set("Accesslist", { [req.access.ip?.toString()]: { warn: 1, blocked: false } }, true);
					}
					if (ip[req.access.ip?.toString()].warn <= 3) {
						core.warn(message);
						return res.status(401).sender({ message: i18n.t("http:errors.ConnectionNotAllowed") });
					} else if (ip[req.access.ip?.toString()].warn > 3 && !ip[req.access.ip?.toString()].blocked) {
						if (!ip[req.access.ip?.toString()].blocked)
							core.warn(
								`[Banido].gray: [${
									req.originalUrl
								}].red [IP:].yellow [(${req.access.ip?.toString()})].red`,
							);
						storage.set("Accesslist", { [req.access.ip?.toString()]: { blocked: true } }, true);
					}
				}
				if (ip[req.access.ip?.toString()] && ip[req.access.ip?.toString()].blocked) {
					banned.warn(
						`Tentativa de acesso [${
							req.originalUrl
						}].red com o ip banido [(${req.access.ip?.toString()})].red`,
					);
					return res.destroy();
				} else {
					core.debug(message);
					return next();
				}
			}
			return res.end();
		}
		if (req.originalUrl === "/robots.txt") {
			res.header({ "Content-Type": "text/plain" });
			return res.send("User-agent: *\nDisallow: /");
		} else if (req.originalUrl === "/favicon.ico") {
			res.writeHead(200, { "Content-Type": "image/x-icon" });
			return res.end();
		} else if (BlockedList.some((item) => req.originalUrl.endsWith(item) || req.originalUrl.startsWith(item))) {
			return CheckerIps(
				`[Bloqueado].gray: [${
					req.originalUrl
				}].red [IP:].yellow [(${req.access.ip?.toString()})].red - [Motivo].gray : A Request acessada era uma request proibida.`,
				true,
			);
		}

		if (callCount === 999) {
			extend++;
			callCount = 0;
		}

		CheckerIps(
			`Acessos: [${req.originalUrl}].magenta [(${
				extend === 0 ? "" + callCount++ : extend + " mil e " + callCount++
			})].blue`,
		);
	};
}
