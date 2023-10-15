import { Application } from "express";
import httpProxy from "http-proxy"
import configuractions from "@/controllers/settings/Default";
import { json } from "@/utils";

export async function ProxyConnects(app: Application) {
    const config = json(configuractions.configPATH + "/settings.json")

    const proxy = httpProxy.createProxyServer({});

    app.use('/painel', (req, res) => {
        proxy.web(req, res, {
            target: config.proxy.pterodactyl,
            autoRewrite:true
          });
        
    });

    app.use('/phpadmin', (req, res) => {
        proxy.web(req, res, { 
            target: config.proxy.phpmyadmin,
            autoRewrite:true
        });
    });
}