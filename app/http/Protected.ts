import express from "express";
import account from "http/router/application/admin/account"

/**
 * #### Todas as rotas passadas dentro desse router requerem Auth,
 * #### caso contrario serão enviadas para o login
 */
const router = express.Router()

router.use(account)

export default router