import express from "express";
import account from "@/http/router/api/admin/account";
import teste from "@/http/router/api/admin/teste";

class Protect {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    this.router.use("/admin", account);
    this.router.use("/admin", teste);
  }

  Routers() {
    return this.router;
  }
}

export default Protect;
