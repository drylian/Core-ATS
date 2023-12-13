import { Request, Response, NextFunction } from "express";

/**
 * Middleware para verificar a presença de Usuario, Token ou Guest
 */
export default function checkRequest() {
  return (req: Request, res: Response, next: NextFunction) => {
    const hasAuthorization =
      req.headers.authorization !== undefined && typeof req.headers.authorization === "string";
    const hasAlternightCookie =
      req.cookies["X-Application-Access"] !== undefined &&
      typeof req.cookies["X-Application-Access"] === "string";

    if (hasAuthorization || hasAlternightCookie) {
      if (req.headers.authorization !== undefined && req.headers.authorization.startsWith("Bearer")) {
        req.checked = "authorization";
      } else if (
        (req.headers.authorization !== undefined && req.headers.authorization.startsWith("UserAuth")) ||
        hasAlternightCookie
      ) {
        req.checked = "user";
      } else {
        req.checked = "guest";
      }
      next();
    } else {
      if (req.accepts("text/html")) {
        return res.redirect("/auth/login?callback=" + req.originalUrl);
      }
      return res.status(401).sender({ message: req.t("http:messages.NotHaveAccessToken") });
    }
  };
}
