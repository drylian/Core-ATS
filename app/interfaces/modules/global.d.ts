import { UserE } from '@/models/User';

declare global {
    namespace Express {
      interface Request {
        user: UserE 
      }
    }
  }