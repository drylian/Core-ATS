/**
 * SetAlowedRoutes
 * @param allowed String das rotas permitidas
 * @param protocol protocolo usado
 * @returns array de rotas permitidas
 */
export function SetAlowedRoutes(allowed: string, protocol: string): string[] {
    const routes = (allowed).split(',').map((route) => route.trim());
    const allowedOrigins: string[] = [];

    let protocols: string[] = [];
    switch (protocol) {
        case 'http':
            protocols.push("http");
            break;
        case 'https':
            protocols.push("https");
            break;
        case 'http/https':
            protocols.push("http");
            protocols.push("https");
            break;
        default:
            break;
    }
    routes.forEach((route) => {
        protocols.forEach((protocol) => {
            if (!route.startsWith("http://") && !route.startsWith("https://")) {
                const origin = `${protocol}://${route}`;
                allowedOrigins.push(origin);
            } else {
                allowedOrigins.push(route);
            }
        });
    });
    return allowedOrigins
}
