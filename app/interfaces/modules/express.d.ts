import { Request as ExpressRequest } from 'express';
import { UserI } from 'models/User';

export interface UserReq extends ExpressRequest {
    User: UserI
}
