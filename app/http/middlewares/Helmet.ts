import { gen } from "@/utils";
import { NextFunction, Request, Response } from "express";
import helmet from "helmet";
/**
 * Middleware para o Helmet
 */
export function Helmet() {
	return (req: Request, res: Response, next: NextFunction) => {
		const nonce = gen(32);
		req.access = {};
		req.access.nonce = nonce
		helmet({
			contentSecurityPolicy: {
				directives: {
					scriptSrc: ["'self'", () => `'nonce-${nonce}'`],
				},
			},
			xPoweredBy: false,
			crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
			crossOriginResourcePolicy: { policy: "same-site" },
			strictTransportSecurity: {
				maxAge: 63072000,
				preload: true,
			},
			xFrameOptions: { action: "sameorigin" },
			xPermittedCrossDomainPolicies: {
				permittedPolicies: "none",
			},
		})(req, res, next);
	};
}
