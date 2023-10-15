import { UserE } from '@/models/User';

declare namespace Express {
    interface Request {
        user: UserE;
    }
  }
