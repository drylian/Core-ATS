import express from 'express';
import { ALTdcp, json } from '@/utils';
import configuractions, { root, type, version } from '@/controllers/settings/Default';
import { UserE } from '@/models/User';
import { ColorJson, SettingsJson } from '@/interfaces';

const router = express.Router();

router.get('/', (req, res) => {
    const config: SettingsJson = json(configuractions.configPATH + '/settings.json');
    const colors: ColorJson = json(configuractions.configPATH + '/color.json');
    let user;

    const { alternightuser } = req.cookies;

    if (alternightuser) {
        const UserData = ALTdcp<UserE | null>(alternightuser, config.server.accessTokenSecret);
        if (UserData !== null) {
            user = UserData;
        }
    }

    const responseData = {
        Website: {
            title: config.server.title,
            url: config.server.url,
            port: config.server.port,
            mode: config.mode,
            source: {
                type: type,
                dir: root,
                version: version ? version : 'development',
            },
            colors: { ...colors },
        },
    };

    res.sender({ json: responseData, ...(user ? { User: user } : {}) });
});

export default router;
