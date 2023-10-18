import imagemRoute from "@/http/router/image";
import ApplicationRoute from "@/http/router/api/application";
import registerRoute from "@/http/router/auth/register";
import refreshRoute from "@/http/router/auth/refresh";
import changeRoute from "@/http/router/auth/change";

import loginRoute from "@/http/router/auth/login";
import { Application } from "express";
import Protected from "@/http/Protected"
import CheckRequest from "./middlewares/CheckRequest";

async function AppRouter(app: Application) {
    /**
     * Rotas da Api
     */
    app.use("/api/", imagemRoute);
    app.use("/api/application", ApplicationRoute);
    /**
     * Rotas Protegidas
     */
    app.use("/api", CheckRequest, Protected)


    /**
     * Rotas de Auth
     */
    app.use("/auth/login", loginRoute)
    app.use("/auth/register", registerRoute)
    app.use("/auth/refresh", refreshRoute)
    app.use("/auth/change", CheckRequest,changeRoute)
}


export { AppRouter }