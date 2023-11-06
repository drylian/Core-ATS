import express from 'express';
import Controller from '@/http/Controller';

export default class TST extends Controller {
    constructor() {
        const router = express.Router();
        super(router);

        this.get('/', (req, res) => {
            throw new Error("Olá teste");
        });

        this.post('/', (req, res) => {
            res.send('exemplo ');
        });
    }
}