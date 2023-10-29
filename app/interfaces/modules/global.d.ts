import { UserE } from '@/models/User';
interface Params<T> {
    message?: string;
    json?: T;
    err?: ErrType;
    list?: object[];
}
declare global {
    namespace Express {
        interface Request {
            cookies: {
                authorization: string | undefined;
            };
            access: {
                permissions: number;
                type: 'user' | 'token';
                uuid: string;
            };
            alternative: {
                origin: string;
            };
            checked: 'user' | 'authorization';
            user: UserE;
        }
        interface Response {
            sender<T>(params: Params<T>): void;
        }
    }
}
