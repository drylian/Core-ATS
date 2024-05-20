import { UserE } from "@/models/User"

declare module 'socket.io' {
    interface ExtendedError extends Error {
        user?: UserE;
    }
    interface Socket {
        access: {
            user: UserE
        }
    }
}
export { }