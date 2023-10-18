import { LoggingsMethods } from '@/controllers/Loggings';
import { UserE } from '@/models/User';

declare global {
    namespace Express {
      interface Request {
        cookies:{
          alternightuser:string | undefined;
        };
        checked: "user" | "authorization";
        user: UserE;
        logger: LoggingsMethods
      }
    }
  }