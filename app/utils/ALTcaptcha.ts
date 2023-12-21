import { SettingsJson } from "@/interfaces";
import * as svgCaptcha from 'svg-captcha';
import storage from "@/controllers/Storage";
import { AlTexp, genv5 } from ".";
import CryptoJS from "crypto-js"
export interface ALTCreateCaptcha {
    image: string;
}
/**
 * CreateCaptcha, Cria um captcha
 * @returns Cria um Captcha 
 */
export function CreateCaptcha(): ALTCreateCaptcha {
    const config: SettingsJson = storage.get("config");
    // cache
    const image = svgCaptcha.create()

    const imagehash = CryptoJS.SHA256(image.text + config.server.signature).toString();// cria um hash unico 
    console.log(image.text)
    storage.set("captchaResources", { [imagehash]: { verifiqued: false } }) // salva no datacache
    return {
        image: image.data
    }
}

export function ValidCaptcha(result: string): false | string {
    const config: SettingsJson = storage.get("config");
    const captcha: { [key: string]: { verifiqued: boolean } } = storage.get("captchaResources")
    const hash = CryptoJS.SHA256(result + config.server.signature).toString();// cria um hash unico 
    console.log(hash, captcha[hash])
    try {
        //tentativa de usar uma captcha inexistente
        if (!captcha[hash]) return false;
        //tentativa de usar uma captcha ja verificada
        else if (captcha[hash].verifiqued) return false;
        const response = {
            result: hash,
            expires: new Date(Date.now() + AlTexp("10m"))
        }
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(response), config.server.signature).toString();
        storage.set("captchaResources", { [hash]: { verifiqued: true } })
        return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(encrypted));
    } catch (e) {
        console.log(e)
        return false;
    }
}

export function CheckCaptcha(responsecode: string): boolean {
    try {
        const config: SettingsJson = storage.get("config")
        const captcha: { [key: string]: { verifiqued: boolean, expected: string } } = storage.get("captchaResources")

        // Decodificar o token hexadecimal
        const base64 = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Hex.parse(responsecode));
        // Descriptografar o token
        const bytes = CryptoJS.AES.decrypt(base64, config.server.signature);
        const decryptedData: { result: string; expires: Date } = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        //tentativa de usar uma captcha inexistente
        if (!captcha[decryptedData.result]) return false;
        //tentativa de usar uma captcha ja verificada
        if (!captcha[decryptedData.result].verifiqued) { storage.del("captchaResources", decryptedData.result); return false; }
        const now = new Date().getTime();
        const expirationTime = new Date(decryptedData.expires).getTime();
        if (now <= expirationTime) {
            // pra finalizar deleta o captcha de cache
            storage.del("captchaResources", decryptedData.result)
            return true;
        } else {
            storage.del("captchaResources", decryptedData.result)
            return false;
        }
    } catch (e) {
        //Captcha error 
        return false;
    }
}