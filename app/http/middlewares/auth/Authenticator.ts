import { NextFunction, Response, Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { json } from 'utils/Json';
import configuractions from "controllers/settings/Default"
import User, { UserI } from 'models/User';

// Middleware de verificação
async function Authenticator(req: any, res: Response, next: NextFunction) {
    const config = json(configuractions.configPATH + "/settings.json")
    console.log(req.headers.alternightuser)
    const { alternightuser,remember_me } = req.headers;

    let token:any
    if(alternightuser){
        const [, valores] = (alternightuser as string).split(' ');
        token = valores
    } else if(req.cookies.alternightuser) {
        token = req.cookies.alternightuser
    } else {
        return res.redirect("/auth/login");

    }

    if (!token) {
        return res.status(401).json({ message: 'Token ausente' });
    }

    jwt.verify(token, config.server.accessTokenSecret, async (err: jwt.VerifyErrors | null, decoded: JwtPayload | any) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        } else {
            if (decoded) {
                if(decoded.permissions < 2000) {
                    return res.json({message:"Você não possue permissão para estar aqui"})
                }
                try {
                    let user:any = await User.findOne({ where: { username: (decoded.username as string) } }) || await User.findOne({ where: { email: (decoded.email as string) } });
                    user.password = "oculto";
                    req.User = user;
                    console.log(req.User)
                    return next()
                } catch (e) {
                    console.log(e)
                    // Bad Json
                }
            }
            return res.status(401).json({ message: 'Informações invalidas' });
        }
    });
}

export default Authenticator;