/**
 * SetAlowedRoutes
 * @param allowed String das rotas permitidas
 * @param protocol protocolo usado
 * @returns array de rotas permitidas
 */

export function SetAlowedRoutes(allowed: string, protocol: string, port: string): string[] {
	const routes = allowed.split(",").map((route) => route.trim());
	const allowedOrigins: string[] = [];

	const protocols: string[] = [];
	switch (protocol) {
	case "http":
		protocols.push("http");
		break;
	case "https":
		protocols.push("https");
		break;
	case "http/https":
		protocols.push("http");
		protocols.push("https");
		break;
	default:
		break;
	}

	routes.forEach((route) => {
		protocols.forEach((protocol) => {
			const originWithPort = `${protocol}://${route}:${port}`;
			const originWithoutPort = `${protocol}://${route}`;

			if (port && !allowedOrigins.includes(originWithPort)) {
				allowedOrigins.push(originWithPort);
			}

			if (!allowedOrigins.includes(originWithoutPort)) {
				allowedOrigins.push(originWithoutPort);
			}
		});
	});
	return allowedOrigins;
}
