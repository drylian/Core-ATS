import { UserE } from "@/models/User";

declare global {
  namespace Express {
    interface Request {
      cookies: {
        authorization: string | undefined;
      };
      access: {
        permissions: number;
        type: "user" | "token";
        uuid: string;
      }
      alternative:{
        origin:string;
      }
      checked: "user" | "authorization";
      user: UserE;
    }
  }
}