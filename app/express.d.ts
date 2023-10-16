import { UserE } from '@/models/User';

declare global {
    namespace Express {
      interface Request {
        user: UserE //or other type you would like to use
      }
    }
  }