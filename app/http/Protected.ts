import express from 'express';
import account from '@/http/router/api/admin/account';
import teste from '@/http/router/api/admin/teste';

/**
 * #### Todas as rotas passadas dentro desse router requerem Auth,
 * #### caso contrario serão enviadas para o login
 */
const router = express.Router();

/**
 * Rotas aqui
 */
router.use('/admin', account);
router.use('/admin', teste);

export default router;
