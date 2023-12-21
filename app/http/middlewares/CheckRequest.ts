import { Request, Response, NextFunction } from "express";

/**
 * Middleware para verificar a presença de Usuario, Token ou Guest
 */
export default function checkRequest() {
  return (req: Request, res: Response, next: NextFunction) => {
    const AccessTokenAuth = req.headers.authorization !== undefined && typeof req.headers.authorization === "string";
    const AccessCookieAuth = req.access?.cookie ? true : false
    if (AccessTokenAuth || AccessCookieAuth) {
      if (req.headers.authorization !== undefined && req.headers.authorization.startsWith("Bearer")) {
        req.checked = "authorization";
      } else if (AccessCookieAuth) {
        req.checked = "user";
      } else if (req.headers.authorization !== undefined && req.headers.authorization.startsWith("Client")) {
        req.checked = "client";
      }
      next();
    } else {
      req.checked = "guest";
      next();
    }
  };
}
