import imagemRoute from "http/router/image";
import ApplicationRoute from "http/router/api/application";
import registerRoute from "http/router/auth/register";
import refreshRoute from "http/router/auth/refresh";
import changeRoute from "http/router/auth/change";

import loginRoute from "http/router/auth/login";
import { Application } from "express";
import Authenticator from "http/middlewares/auth/Authenticator";
import Protected from "http/Protected"

async function AppRouter(app: Application) {
    /**
     * Rotas da Api
     */
    app.use("/api/", imagemRoute);
    app.use("/api/application", ApplicationRoute);

    /**
     * Rotas de Auth
     */
    app.use("/auth/login", loginRoute)
    app.use("/auth/register", registerRoute)
    app.use("/auth/refresh", refreshRoute)
    app.use("/auth/change", changeRoute)


    /**
     * Rotas Protegidas
     */
    app.use("/application", Authenticator, Protected)
}


export { AppRouter }